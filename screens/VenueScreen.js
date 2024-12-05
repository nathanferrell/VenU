
import React, { useRef } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, PanResponder, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VenueScreen = () => {
  const navigation = useNavigation();
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -50) {
          navigation.navigate('Home');
        } else if (gestureState.dx > 50) {
          navigation.navigate('Favorites');
        }
      },
    })
  ).current;

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

  const renderSettingCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => console.log(`${item.title} clicked`)}>
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <Animated.View {...panResponder.panHandlers} style={styles.container}>
      <FlatList
        key={'2-columns'}
        data={settings}
        renderItem={renderSettingCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  grid: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  card: {
    flex: 1,
    margin: 10,
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: '#1e1e1e',
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
    color: '#fff',
  },
});

export default VenueScreen;
