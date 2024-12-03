import React, { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity, PanResponder, Animated } from 'react-native';
import { useFavorites } from './FavoritesContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { screenStyles } from '../styles';

const Card = ({ item }: { item: { id: string; title: string } }) => {
    const { removeFavorite } = useFavorites();

    return (
        <View style={screenStyles.card}>
            <Text style={screenStyles.cardText}>{item.title}</Text>
            <TouchableOpacity onPress={() => removeFavorite(item.id)}>
                <Ionicons name="heart" size={24} color='#9363f4' />
            </TouchableOpacity>
        </View>
    );
};

const FavoritesScreen = () => {
    const navigation = useNavigation();
    const { favorites } = useFavorites();
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                // Only respond to horizontal swipes
                return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx < -50) {
                    // Swipe left to navigate to Venue
                    navigation.navigate('Venue'); // Match this with the tab name in App.tsx
                } else if (gestureState.dx > 50) {
                    // Swipe right to navigate to Home
                    navigation.navigate('Home'); // Match this with the tab name in App.tsx
                }
            },
        })
    ).current;

    const favoriteRecentEvents = favorites.filter((item) => item.type === 'recent');
    const favoriteUpcomingEvents = favorites.filter((item) => item.type === 'upcoming');
    const favoriteVenues = favorites.filter((item) => item.type === 'venue');

    const renderCard = ({ item }: { item: { id: string; title: string } }) => (
        <Card item={item} />
    );

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={screenStyles.container}
        >
            <ScrollView>
                {/* Favorite Recent Events Section */}
                {favoriteRecentEvents.length > 0 && (
                    <View style={screenStyles.section}>
                        <Text style={screenStyles.sectionTitle}> Recent Events</Text>
                        <FlatList
                            data={favoriteRecentEvents}
                            renderItem={renderCard}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={screenStyles.horizontalScroll}
                        />
                    </View>
                )}

                {/* Favorite Upcoming Events Section */}
                {favoriteUpcomingEvents.length > 0 && (
                    <View style={screenStyles.section}>
                        <Text style={screenStyles.sectionTitle}> Upcoming Events</Text>
                        <FlatList
                            data={favoriteUpcomingEvents}
                            renderItem={renderCard}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={screenStyles.horizontalScroll}
                        />
                    </View>
                )}

                {/* Favorite Venues Section */}
                {favoriteVenues.length > 0 && (
                    <View style={screenStyles.section}>
                        <Text style={screenStyles.sectionTitle}> Venues</Text>
                        <FlatList
                            data={favoriteVenues}
                            renderItem={renderCard}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={screenStyles.horizontalScroll}
                        />
                    </View>
                )}
            </ScrollView>
        </Animated.View>
    );
};



export default FavoritesScreen;

