
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const UpcomingConcerts = ({ navigation }) => {
    const upcomingConcerts = require('../data/upcomingconcerts.json');

    return (
        <View style={styles.container}>
            <FlatList
                data={upcomingConcerts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.details}>Date: {item.date}</Text>
                        {/* Add more details as needed */}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'black', // consistent with the theme
    },
    card: {
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 20,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        color: '#bb86fc', // neon purple
    },
    details: {
        fontSize: 16,
        color: '#e4d1ff', // lighter purple
    }
});

export default UpcomingConcerts;
