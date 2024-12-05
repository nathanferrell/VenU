import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import { launchImageLibrary } from 'react-native-image-picker';
import { commonStyles } from '../styles';
import { useNavigation } from '@react-navigation/native';

const concerts = require('../data/concerts.json');
const venues = require('../data/venues.json');
const artists = require('../data/artists.json');

const ConcertDetail = ({ route }) => {
  const { concertId } = route.params;
  const navigation = useNavigation();
  const concert = concerts.find(c => c.id === concertId);
  const venue = venues.find(v => v.id === concert.venueId);
  const concertArtists = concert.artistIds.map(id => artists.find(a => a.id === id));
  const renderText = text => text || '';

  const [modalVisible, setModalVisible] = useState(false);
  const [reviews, setReviews] = useState(concert?.reviews || []);
  const [reviewText, setReviewText] = useState('');
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [photoUri, setPhotoUri] = useState(null);

  const addReview = () => {
    const newReview = {
      id: Date.now(),
      author: reviewAuthor || 'Anonymous',
      text: reviewText || 'No review text',
      photo: photoUri || null,
    };
    setReviews([...reviews, newReview]);
    setReviewText('');
    setReviewAuthor('');
    setPhotoUri(null);
    setModalVisible(false);
  };

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          setPhotoUri(response.assets[0].uri);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={commonStyles.header}>{concert.name}</Text>
      <Text style={commonStyles.text}>{concert.date}</Text>
      <Text style={commonStyles.text}>
        {venue?.name || 'Unknown Venue'}, {venue?.location || 'Unknown Location'}
      </Text>
      {concertArtists.map(artist => (
        <TouchableOpacity
          key={artist?.id}
          onPress={() => navigation.navigate('ArtistDetails', { artistId: artist?.id })}
        >
          <Text style={styles.linkText}>
            {artist?.name || 'Unknown Artist'} - {artist?.genre || 'Unknown Genre'}
          </Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Reviews:</Text>
      {Array.isArray(reviews) && reviews.length > 0 ? (
        <FlatList
          data={reviews}
          keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
          renderItem={({ item }) => (
            <View style={styles.reviewContainer}>
              <Text style={styles.reviewAuthor}>By {renderText(item.author)}</Text>
              <Text style={styles.reviewText}>{renderText(item.text)}</Text>
              {item.photo && <Image source={{ uri: item.photo }} style={styles.reviewImage} />}
            </View>
          )}
        />
      ) : (
        <Text>No reviews available</Text>
      )}

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalContent}>
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
          />
          <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
            <Text style={styles.pickImageText}>Pick an Image</Text>
          </TouchableOpacity>
          {photoUri && <Image source={{ uri: photoUri }} style={styles.previewImage} />}
          <View style={styles.buttonContainer}>
            <Button title="Submit" color="#9363f4" onPress={addReview} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Close" color="#9363f4" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
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
    height: '50%',
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
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default ConcertDetail;
