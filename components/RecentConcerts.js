import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Card from './Card';
import { commonStyles } from '../styles';
const upcomingconcerts = require('../data/upcomingconcerts.json');
const concerts = require('../data/concerts.json');
const venues = require('../data/venues.json');
const artists = require('../data/artists.json');

const RecentConcerts = () => (
  <View>
    <Text style={commonStyles.header}>Recent Concerts</Text>
    <FlatList
      data={concerts}
      horizontal={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const venue = venues.find(v => v.id === item.venueId);
        const concertArtists = item.artistIds.map(id => artists.find(a => a.id === id));
        return (
          <Card>
            <Text style={commonStyles.title}>{item.name}</Text>
            <Text style={commonStyles.text}>{item.date}</Text>
            <Text style={commonStyles.text}>{venues.name},{venues.location}</Text>
            {concertArtists.map(artist => (
              <Text key={artist.id} style={commonStyles.text}>{artist.genre}</Text>
            ))}
          </Card>
        );
      }}
    />
  </View>
);

export default RecentConcerts;
