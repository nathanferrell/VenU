import React, { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, PanResponder, Animated } from 'react-native';
import { useFavorites } from './FavoritesContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// Card component with a heart icon for adding or removing from favorites
const Card = ({ item, type }: { item: { id: string; title: string }; type: string }) => {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const isFav = isFavorite(item.id);

    const toggleFavorite = () => {
        if (isFav) {
            removeFavorite(item.id);
        } else {
            addFavorite({ ...item, type });
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.cardText}>{item.title}</Text>
            <TouchableOpacity onPress={toggleFavorite}>
                <Ionicons
                    name={isFav ? 'heart' : 'heart-outline'}
                    size={24}
                    color={isFav ? '#9363f4' : '#9363f4'}
                />
            </TouchableOpacity>
        </View>
    );
};

const HomeScreen = () => {
    const navigation = useNavigation();
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx < -50) {
                    navigation.navigate('Favorites');
                } else if (gestureState.dx > 50) {
                    navigation.navigate('Venue');
                }
            },
        })
    ).current;

    // Load data from the JSON files
    const concerts = require('../data/concerts.json');
    const venues = require('../data/venues.json');
    const artists = require('../data/artists.json');
    const upcomingConcerts = require('../data/upcomingconcerts.json')


    // Limit to the first 3 items for each section
    const limitedRecentData = concerts.slice(0, 3);
    const limitedUpcomingData = upcomingConcerts.slice(0, 3);
    const limitedVenuesData = venues.slice(0, 3);

    // Render each section card
    const renderCard = ({ item, type }: { item: { id: string; title: string }, type: string }) => (
        <Card item={item} type={type} />
    );
    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={{ flex: 1, backgroundColor: 'black' }}
        >
            <ScrollView style={styles.container}>
                {/* Recent Section */}
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => navigation.navigate('RecentConcerts')}>
                        <Text style={styles.sectionTitle}>Recent</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={limitedRecentData}  // Limit to 3 items
                        renderItem={({ item }) => renderCard({ item: { id: item.id, title: item.name }, type: 'recent' })}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.horizontalScroll}
                    />
                </View>

        {/* Upcoming Section */}
                            <View style={styles.section}>
                                <TouchableOpacity onPress={() => navigation.navigate('UserArtists')}>
                                    <Text style={styles.sectionTitle}>Upcoming</Text>
                                </TouchableOpacity>
                                <FlatList
                                   data={limitedUpcomingData}  // Use upcomingConcerts.json data
                                    renderItem={({ item }) => renderCard({ item: { id: item.id, title: item.name }, type: 'upcoming' })}
                                    keyExtractor={(item) => item.id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    style={styles.horizontalScroll}
                                />
                            </View>
                            

                {/* Venues Section */}
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => navigation.navigate('UserVenues')}>
                        <Text style={styles.sectionTitle}>Venues</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={limitedVenuesData}  // Limit to 3 items
                        renderItem={({ item }) => renderCard({ item: { id: item.id, title: item.name }, type: 'venue' })}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.horizontalScroll}
                    />
                </View>
            </ScrollView>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 10,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#e4d1ff',
        marginBottom: 10,
    },
    horizontalScroll: {
        flexDirection: 'row',
    },
    card: {
        width: 150, // Preserving the specified dimensions
        height: 100,
        backgroundColor: '#3c3c3c', // Medium gray background
        borderRadius: 10, // Slightly increased border radius for consistency
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    cardText: {
        fontSize: 18,
        color: '#e4d1ff',
    },
});

export default HomeScreen;

