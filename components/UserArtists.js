import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Card from './Card';
import { commonStyles } from '../styles';
const artists = require('../data/artists.json');
import { useNavigation } from '@react-navigation/native';

const FavoriteArtists = () => {
  const navigation = useNavigation();  // Initialize the navigation hook

  // Navigate to artist detail page when clicked
  const handleArtistClick = (artistId) => {
    navigation.navigate('ArtistDetails', { artistId });  // Pass artist ID as parameter
  };

  return (
    <View>
      <Text style={commonStyles.header}>Favorite Artists</Text>
      <FlatList
        data={artists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleArtistClick(item.id)}>
            <Card>
              <Text style={commonStyles.title}>{item.name}</Text>
              <Text style={commonStyles.text}>{item.genre}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FavoriteArtists;