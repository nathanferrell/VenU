import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

const VenueScreen = () => {
  // Sample data for user settings
  const settings = [
    { id: '1', title: 'Profile' },
    { id: '2', title: 'Notifications' },
    { id: '3', title: 'Privacy' },
    { id: '4', title: 'Language' },
    { id: '5', title: 'Theme' },
    { id: '6', title: 'Security' },
    { id: '7', title: 'Help' },
    { id: '8', title: 'About' },
  ];

  // Render each setting card
  const renderSettingCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => console.log(`${item.title} clicked`)}>
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Assign a unique key based on numColumns */}
      <FlatList
        key={'2-columns'} // Unique key for the FlatList
        data={settings}
        renderItem={renderSettingCard}
        keyExtractor={(item) => item.id}
        numColumns={2} // Set 2 cards per row
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
  },
  grid: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  card: {
    flex: 1,
    margin: 10,
    aspectRatio: 1, // Ensures cards are square
    borderRadius: 8,
    backgroundColor: '#1e1e1e', // Dark gray card color
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff', // White text for contrast
  },
});

export default VenueScreen;
