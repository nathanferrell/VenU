import React, { useRef } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, PanResponder, Animated } from 'react-native';
import { useFavorites } from './FavoritesContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { screenStyles } from '../styles';
import { StyleSheet } from 'react-native';

const Card = ({ item, type, navigation }: { item: { id: string; title: string }; type: string; navigation: any }) => {
    const { removeFavorite } = useFavorites();

    const handlePress = () => {
        if (type === 'recent') {
            navigation.navigate('ConcertDetail', { concertId: item.id });
        } else if (type === 'venue') {
            navigation.navigate('VenueDetails', { venueId: item.id });
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.cardText}>{item.title}</Text>
            <TouchableOpacity onPress={() => removeFavorite(item.id)}>
                <Ionicons name="heart" size={24} color="purple" />
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
                return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx < -50) {
                    navigation.navigate('Venue');
                } else if (gestureState.dx > 50) {
                    navigation.navigate('Home');
                }
            },
        })
    ).current;

    const favoriteRecentEvents = favorites.filter((item) => item.type === 'recent');
    const favoriteUpcomingEvents = favorites.filter((item) => item.type === 'upcoming');
    const favoriteVenues = favorites.filter((item) => item.type === 'venue');

    const renderCard = ({ item, type }: { item: { id: string; title: string }, type: string }) => (
        <Card item={item} type={type} navigation={navigation} />
    );

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={screenStyles.container}
        >
            <ScrollView>
                {/* Favorite Recent Events Section */}
                {favoriteRecentEvents.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Favorite Recent Events</Text>
                        <FlatList
                            data={favoriteRecentEvents}
                            renderItem={({ item }) => renderCard({ item, type: 'recent' })}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={screenStyles.horizontalScroll}
                        />
                    </View>
                )}

                {/* Favorite Upcoming Events Section */}
                {favoriteUpcomingEvents.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Favorite Upcoming Events</Text>
                        <FlatList
                            data={favoriteUpcomingEvents}
                            renderItem={({ item }) => renderCard({ item, type: 'upcoming' })}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={screenStyles.horizontalScroll}
                        />
                    </View>
                )}

                {/* Favorite Venues Section */}
                {favoriteVenues.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Favorite Venues</Text>
                        <FlatList
                            data={favoriteVenues}
                            renderItem={({ item }) => renderCard({ item, type: 'venue' })}
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
        width: 150,
        height: 100,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    cardText: {
        fontSize: 16,
    },
});

export default FavoritesScreen;
