import React, { useRef } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, PanResponder, Animated } from 'react-native';
import { useFavorites } from './FavoritesContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { screenStyles } from '../styles';

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
        <TouchableOpacity onPress={handlePress} style={screenStyles.card}>
            <Text style={screenStyles.cardText}>{item.title}</Text>
            <TouchableOpacity onPress={() => removeFavorite(item.id)}>
                <Ionicons name="heart" size={24} color="#9363f4" />
            </TouchableOpacity>
        </TouchableOpacity>
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
                    <View style={screenStyles.section}>
                        <Text style={screenStyles.sectionTitle}>Recent Events</Text>
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
                    <View style={screenStyles.section}>
                        <Text style={screenStyles.sectionTitle}>Upcoming Events</Text>
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
                    <View style={screenStyles.section}>
                        <Text style={screenStyles.sectionTitle}>Venues</Text>
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

export default FavoritesScreen;
