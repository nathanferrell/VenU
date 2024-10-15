import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

const HomeScreen = ({ navigation }) => {
  const onSwipeLeft = () => {
    navigation.navigate('ArtistScreen'); // Swipe left to go to ArtistScreen
  };

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
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

export default HomeScreen;

