import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';  // Hook to get navigation parameters

const artists = require('../data/artists.json');  // Load artists data

const ArtistDetails = () => {
  const route = useRoute();  // Get navigation parameters
  const { artistId } = route.params;  // Retrieve artist ID from params

  // Find the artist by ID
  const artist = artists.find(a => a.id === artistId);

  if (!artist) {
    return <Text>Artist not found</Text>;
  }

  // Helper function to safely render text (fallback to string if undefined or non-string)
  const renderText = (value) => {
    return typeof value === 'string' ? value : String(value || '');
  };

  return (
    <ScrollView style={styles.container}>
      {artist.photoUrl ? (
        <Image source={{ uri: artist.photoUrl }} style={styles.artistImage} />
      ) : (
        <Text>No image available</Text>
      )}

      {/* Render artist details */}
      <Text style={styles.artistName}>{renderText(artist.name)}</Text>
      <Text style={styles.artistGenre}>{renderText(artist.genre)}</Text>
      <Text style={styles.artistBio}>{renderText(artist.bio)}</Text>



      {/* Render artist photos */}
      <Text style={styles.sectionTitle}>Photos:</Text>
      {Array.isArray(artist.photos) && artist.photos.length > 0 ? (
        <ScrollView horizontal>
          {artist.photos.map((photo, index) => (
            <Image key={index} source={{ uri: photo }} style={styles.artistPhoto} />
          ))}
        </ScrollView>
      ) : (
        <Text>No photos available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  artistImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  artistName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  artistGenre: {
    fontSize: 20,
    color: 'gray',
    marginBottom: 8,
  },
  artistBio: {
    fontSize: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  reviewContainer: {
    marginBottom: 12,
  },
  reviewAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewText: {
    fontSize: 14,
    color: 'gray',
  },
  artistPhoto: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
});

export default ArtistDetails;
