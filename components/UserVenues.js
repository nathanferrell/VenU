import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Card from './Card';
import { commonStyles } from '../styles/styles';
const venues = require('../data/venues.json');

const Venues = () => (
  <View>
    <Text style={commonStyles.header}>Pinned Venues</Text>
    <FlatList
      data={venues}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Card>
          <Text style={commonStyles.title}>{item.name}</Text>
          <Text style = {commonStyles.text}>Location: {item.location}</Text>
          <Text style = {commonStyles.text}>Address: {item.address}</Text>
          <Text style = {commonStyles.text}>Capacity: {item.capacity}</Text>
        </Card>
      )}
    />
  </View>
);

export default Venues;