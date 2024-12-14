import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Card from './Card';
import { commonStyles } from '../styles';
import { useNavigation } from '@react-navigation/native';
const venues = require('../data/venues.json');

const Venues = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>

    <Text style={commonStyles.header}>Pinned Venues</Text>
    <FlatList
      data={venues}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('VenueDetails', { venueId: item.id })}>
         <Card style={{ backgroundColor: '#333', margin: 10, padding: 20 }}>
                 <Text style={commonStyles.title}>{item.name}</Text>
        </Card>
        </TouchableOpacity>
      )}
    />
  </View>
  );
};

export default Venues;
