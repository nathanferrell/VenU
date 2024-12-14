import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Button,
  ScrollView,
  Modal as RNModal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import { launchImageLibrary } from 'react-native-image-picker';
import { commonStyles } from '../styles';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Load JSON data
const concerts = require('../data/concerts.json');
const venues = require('../data/venues.json');
const artists = require('../data/artists.json');

const ConcertDetail = ({ route }) => {
  const { concertId } = route.params;
  const navigation = useNavigation();
  const [user] = useState(auth().currentUser);

  const concert = concerts.find(c => c.id === concertId);
  const venue = venues.find(v => v.id === mapVenueId(concert?.venueId));
  const concertArtists = concert?.artistIds?.map(id => artists.find(a => a.id === id)) || [];

  const [modalVisible, setModalVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [photoUri, setPhotoUri] = useState(null);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [concertId]);

  const fetchReviews = async () => {
    try {
      const reviewsSnapshot = await firestore()
        .collection('concerts')
        .doc(concertId)
        .collection('reviews')
        .orderBy('createdAt', 'desc')
        .get();

      const fetchedReviews = reviewsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setReviews(fetchedReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      Alert.alert('Error', 'Failed to load reviews');
    }
  };

  const convertImageToBase64 = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image:', error);
      throw error;
    }
  };

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
        maxWidth: 800,
        maxHeight: 800,
      },
      async response => {
        if (response.assets && response.assets.length > 0) {
          try {
            const uri = response.assets[0].uri;
            setPhotoUri(uri);
          } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to process image');
          }
        }
      }
    );
  };

  const addReview = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to add a review');
      return;
    }

    if (!reviewText.trim()) {
      Alert.alert('Error', 'Please write a review before submitting');
      return;
    }

    setIsLoading(true);
    try {
      let base64Image = null;
      if (photoUri) {
        base64Image = await convertImageToBase64(photoUri);
      }

      const reviewData = {
        authorId: user.uid,
        authorEmail: user.email,
        author: reviewAuthor || 'Anonymous',
        text: reviewText,
        photo: base64Image,
        createdAt: firestore.FieldValue.serverTimestamp(),
        concertId: concertId
      };

      await firestore()
        .collection('concerts')
        .doc(concertId)
        .collection('reviews')
        .add(reviewData);

      await fetchReviews();
      setReviewText('');
      setReviewAuthor('');
      setPhotoUri(null);
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding review:', error);
      Alert.alert('Error', 'Failed to add review. The image might be too large.');
    } finally {
      setIsLoading(false);
    }
  };

  function mapVenueId(venueId) {
    const venueMap = {
      "1": "one",
      "2": "two",
      "3": "three",
      "4": "four",
      "5": "five",
    };
    return venueMap[venueId] || venueId;
  }

  return (
    <View style={styles.container}>
      <Text style={commonStyles.header}>{concert?.name || 'Unknown Concert'}</Text>
      <Text style={commonStyles.text}>{concert?.date || 'Date unknown'}</Text>
      <Text style={commonStyles.text}>
        {venue?.name || 'Unknown venue'}, {venue?.location || 'Location unknown'}
      </Text>
      
      {concertArtists.map(artist => (
        <TouchableOpacity
          key={artist?.id}
          onPress={() => navigation.navigate('ArtistDetails', { artistId: artist?.id })}
        >
          <Text style={styles.linkText}>
            {artist?.name || 'Unknown artist'} - {artist?.genre || 'Unknown genre'}
          </Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Reviews:</Text>
      {reviews.length > 0 ? (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.reviewContainer}>
              <Text style={styles.reviewAuthor}>By {item.author}</Text>
              <Text style={styles.reviewText}>{item.text}</Text>
              {item.photo && (
                <TouchableOpacity onPress={() => setEnlargedImage(item.photo)}>
                  <Image source={{ uri: item.photo }} style={styles.reviewImage} />
                </TouchableOpacity>
              )}
              {item.authorId === user?.uid && (
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={async () => {
                    try {
                      await firestore()
                        .collection('concerts')
                        .doc(concertId)
                        .collection('reviews')
                        .doc(item.id)
                        .delete();
                      await fetchReviews();
                    } catch (error) {
                      console.error('Error deleting review:', error);
                      Alert.alert('Error', 'Failed to delete review');
                    }
                  }}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      ) : (
        <Text style={styles.noReviewsText}>No reviews available</Text>
      )}

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <RNModal
        visible={!!enlargedImage}
        transparent={true}
        onRequestClose={() => setEnlargedImage(null)}
      >
        <TouchableOpacity 
          style={styles.enlargedImageContainer} 
          activeOpacity={1} 
          onPress={() => setEnlargedImage(null)}
        >
          {enlargedImage && (
            <Image 
              source={{ uri: enlargedImage }} 
              style={styles.enlargedImage} 
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </RNModal>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.modalTitle}>Add a Review</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Your name"
              value={reviewAuthor}
              onChangeText={setReviewAuthor}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Write your review..."
              value={reviewText}
              onChangeText={setReviewText}
              multiline
            />
            <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
              <Text style={styles.pickImageText}>Add Photo</Text>
            </TouchableOpacity>
            {photoUri && <Image source={{ uri: photoUri }} style={styles.previewImage} />}
            <View style={styles.buttonContainer}>
              <Button 
                title={isLoading ? "Submitting..." : "Submit Review"} 
                color="#9363f4" 
                onPress={addReview}
                disabled={isLoading}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Cancel" color="#9363f4" onPress={() => setModalVisible(false)} />
            </View>
          </ScrollView>
        </View>
      </Modal>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#9363f4" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  linkText: {
    fontSize: 18,
    color: '#1E90FF',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
    color: '#fff',
  },
  reviewContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  reviewAuthor: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#A020F0',
  },
  reviewText: {
    marginTop: 5,
    fontSize: 16,
    color: '#A020F0',
    fontWeight: 'bold',
  },
  reviewImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#9363f4',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'flex-start',
    minWidth: 50,
    alignItems: 'center'
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#9363f4',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    color: '#e4d1ff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    height: '70%',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#9363f4',
  },
  textInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  pickImageButton: {
    backgroundColor: '#9363f4',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  pickImageText: {
    color: '#fff',
    fontSize: 16,
  },
  previewImage: {
    width: 200,
    height: 200,
    marginBottom: 15,
    alignSelf: 'center',
    borderRadius: 8,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  enlargedImageContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enlargedImage: {
    width: '90%',
    height: '80%',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noReviewsText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ConcertDetail;
