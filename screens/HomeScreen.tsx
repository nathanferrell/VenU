import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useFavorites } from './FavoritesContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
                    color={isFav ? 'purple' : '#9363f4'}
                />
            </TouchableOpacity>
        </View>
    );
};

const HomeScreen = () => {
    // Placeholder data for each section
    const recentData = [
        { id: '1', title: 'Recent 1' },
        { id: '2', title: 'Recent 2' },
        { id: '3', title: 'Recent 3' },
    ];

    const upcomingData = [
        { id: '4', title: 'Upcoming 1' },
        { id: '5', title: 'Upcoming 2' },
        { id: '6', title: 'Upcoming 3' },
    ];

    const venuesData = [
        { id: '7', title: 'Venue 1' },
        { id: '8', title: 'Venue 2' },
        { id: '9', title: 'Venue 3' },
    ];

    const renderCard = ({ item, type }: { item: { id: string; title: string }, type: string }) => (
        <Card item={item} type={type} />
    );

    return (
        <ScrollView style={styles.container}>
            {/* Recent Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent</Text>
                <FlatList
                    data={recentData}
                    renderItem={({ item }) => renderCard({ item, type: 'recent' })}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.horizontalScroll}
                />
            </View>

            {/* Upcoming Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Upcoming</Text>
                <FlatList
                    data={upcomingData}
                    renderItem={({ item }) => renderCard({ item, type: 'upcoming' })}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.horizontalScroll}
                />
            </View>

            {/* Venues Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Venues</Text>
                <FlatList
                    data={venuesData}
                    renderItem={({ item }) => renderCard({ item, type: 'venue' })}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.horizontalScroll}
                />
            </View>
        </ScrollView>
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

export default HomeScreen;

