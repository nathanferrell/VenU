import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
  const renderText = (text) => text || '';


  return (
    <View style={styles.container}>
      <Text style={commonStyles.header}>{concert.name}</Text>
      <Text style={commonStyles.text}>{concert.date}</Text>
      <Text style={commonStyles.text}>{venues.name}, {venues.location}</Text>
      {concertArtists.map(artist => (
      <TouchableOpacity key={artist.id} onPress={() => navigation.navigate('ArtistDetails', { artistId: artist.id })}>
       <Text style={styles.linkText}>{artist.name} - {artist.genre}</Text>
       </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Reviews:</Text>
      {Array.isArray(concert.reviews) && concert.reviews.length > 0 ? (
        concert.reviews.map((review, index) => (
          <View key={index} style={styles.reviewContainer}>
            <Text style={styles.reviewAuthor}>By {renderText(review.author)}</Text>
            <Text style={styles.reviewText}>{renderText(review.text)}</Text>
          </View>
        ))
      ) : (
        <Text>No reviews available</Text>
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
});

export default ConcertDetail;
