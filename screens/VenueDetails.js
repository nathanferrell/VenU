import React from 'react';
import { View, Text, StyleSheet, ShadowPropTypesIOS } from 'react-native';

const venues = require('../data/venues.json');

const VenueDetails = ({ route }) => {
  const { venueId } = route.params;
  const venue = venues.find(v => v.id === venueId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{venue.name}</Text>
      <Text style={styles.text}>Location: {venue.location}</Text>
      <Text style={styles.text}>Address: {venue.address}</Text>
      <Text style={styles.text}>Capacity: {venue.capacity}</Text>
    </View>
  );
};

const neonShadow = {
  textShadowColor: '#bb86fc',
  textShadowOffset: { width: -1, height: 1 },
  textShadowRadius: 10
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Set background to black for the neon effect
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#bb86fc', // A neon purple color
    marginBottom: 20, // Add some space below the title
    borderBottomWidth: 2, // Add an underline with a neon color
    borderBottomColor: '#bb86fc',
    ...neonShadow,

  },
  text: {
    fontSize: 18,
    color: '#e4d1ff', // Lighter purple color for regular text
    marginVertical: 5,

  }
});

export default VenueDetails;
