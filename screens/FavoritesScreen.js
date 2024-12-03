import React, { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity, PanResponder, Animated } from 'react-native';
import { useFavorites } from './FavoritesContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Card = ({ item }: { item: { id: string; title: string } }) => {
    const { removeFavorite } = useFavorites();

    return (
        <View style={styles.card}>
            <Text style={styles.cardText}>{item.title}</Text>
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
            style={styles.container}
        >
            <ScrollView>
                {/* Favorite Recent Events Section */}
                {favoriteRecentEvents.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}> Recent Events</Text>
                        <FlatList
                            data={favoriteRecentEvents}
                            renderItem={renderCard}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.horizontalScroll}
                        />
                    </View>
                )}

                {/* Favorite Upcoming Events Section */}
                {favoriteUpcomingEvents.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}> Upcoming Events</Text>
                        <FlatList
                            data={favoriteUpcomingEvents}
                            renderItem={renderCard}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.horizontalScroll}
                        />
                    </View>
                )}

                {/* Favorite Venues Section */}
                {favoriteVenues.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}> Venues</Text>
                        <FlatList
                            data={favoriteVenues}
                            renderItem={renderCard}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.horizontalScroll}
                        />
                    </View>
                )}
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

export default FavoritesScreen;

