import React, { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, PanResponder, Animated } from 'react-native';
import { useFavorites } from './FavoritesContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { screenStyles } from '../styles';

const Card = ({ item, type, navigation }) => {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const isFav = isFavorite(item.id);

    const toggleFavorite = () => {
        if (isFav) {
            removeFavorite(item.id);
        } else {
            addFavorite({ ...item, type });
        }
    };

    const handlePress = () => {
        if (type === 'recent') {
            navigation.navigate('ConcertDetail', { concertId: item.id });
        } else if (type === 'venue') {
            navigation.navigate('VenueDetails', { venueId: item.id });
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} style={screenScreenStyles.card}>
            <Text style={screenScreenStyles.cardText}>{item.title}</Text>
            <TouchableOpacity onPress={toggleFavorite}>
                <Ionicons
                    name={isFav ? 'heart' : 'heart-outline'}
                    size={24}
                    color={isFav ? '#9363f4' : '#9363f4'}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const HomeScreen = () => {
    const navigation = useNavigation();
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) =>
                Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx < -50) {
                    navigation.navigate('Favorites');
                } else if (gestureState.dx > 50) {
                    navigation.navigate('Venue');
                }
            },
        })
    ).current;

    const concerts = require('../data/concerts.json');
    const venues = require('../data/venues.json');
    const artists = require('../data/artists.json');
    const upcomingConcerts = require('../data/upcomingconcerts.json')


    const limitedRecentData = concerts.slice(0, 3);
    const limitedUpcomingData = upcomingConcerts.slice(0, 3);
    const limitedVenuesData = venues.slice(0, 3);

    const renderCard = ({ item, type }) => (
        <Card item={item} type={type} navigation={navigation} />
    );

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={{ flex: 1, backgroundColor: 'black' }}
        >
            <ScrollView style={screenStyles.container}>
                {/* Recent Section */}
                <View style={screenStyles.section}>
                    <TouchableOpacity onPress={() => navigation.navigate('RecentConcerts')}>
                        <Text style={screenStyles.sectionTitle}>Recent</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={limitedRecentData}  
                        renderItem={({ item }) => renderCard({ item: { id: item.id, title: item.name }, type: 'recent' })}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={screenStyles.horizontalScroll}
                    />
                </View>

        {/* Upcoming Section */}
                            <View style={screenStyles.section}>
                                <TouchableOpacity onPress={() => navigation.navigate('UserArtists')}>
                                    <Text style={screenStyles.sectionTitle}>Upcoming</Text>
                                </TouchableOpacity>
                                <FlatList
                                   data={limitedUpcomingData}  
                                    renderItem={({ item }) => renderCard({ item: { id: item.id, title: item.name }, type: 'upcoming' })}
                                    keyExtractor={(item) => item.id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    style={screenStyles.horizontalScroll}
                                />
                            </View>
                            

                {/* Venues Section */}
                <View style={screenStyles.section}>
                    <TouchableOpacity onPress={() => navigation.navigate('UserVenues')}>
                        <Text style={screenStyles.sectionTitle}>Venues</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={limitedVenuesData}  // Limit to 3 items
                        renderItem={({ item }) => renderCard({ item: { id: item.id, title: item.name }, type: 'venue' })}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={screenStyles.horizontalScroll}
                    />
                </View>
            </ScrollView>
        </Animated.View>
    );
};


export default HomeScreen;
