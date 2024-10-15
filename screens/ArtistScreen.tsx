import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

const ArtistScreen = ({ navigation }) => {
  const onSwipeLeft = () => {
    navigation.navigate('VenueScreen'); // Swipe left to go to VenueScreen
  };

  const onSwipeRight = () => {
    navigation.navigate('HomeScreen'); // Swipe right to go back to HomeScreen
  };

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      style={styles.container}
    >
      <View>
        <Text style={styles.text}></Text>
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default ArtistScreen;

