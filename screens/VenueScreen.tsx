import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

const VenueScreen = ({ navigation }) => {
  const onSwipeRight = () => {
    navigation.navigate('ArtistScreen'); // Swipe right to go back to ArtistScreen
  };

  return (
    <GestureRecognizer
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

export default VenueScreen;

