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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  }
});

export default ConcertDetail;
