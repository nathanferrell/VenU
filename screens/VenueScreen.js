import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';
import { getJSON } from '../services/api'; 
import { buildPhotoUrl } from '../utility/formatting'; 
import { PhotoView } from '../components/presentation';

const VenueScreen = () => {
    const navigation = useNavigation();
    const [pending, setPending] = useState(true);

    const onSwipe = (gestureName) => {
        const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        if (gestureName === SWIPE_LEFT) {
            navigation.navigate('Home'); 
        } else if (gestureName === SWIPE_RIGHT) {
            navigation.navigate('Favorites'); 
        }
      },
    })
  ).current;

  const settings = [
    { id: '1', title: 'Profile' },
    { id: '2', title: 'Notifications' },
    { id: '3', title: 'Privacy' },
    { id: '4', title: 'Language' },
    { id: '5', title: 'Theme' },
    { id: '6', title: 'Security' },
    { id: '7', title: 'Help' },
    { id: '8', title: 'About' },
  ];

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Pinned Artists</Text>
            <GestureRecognizer
                onSwipe={(direction) => onSwipe(direction)}
                config={config}
                style={styles.container}
            >
                <PhotoView photoRoute={(id) => console.log(`Photo ID: ${id}`)} />
            </GestureRecognizer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 10,
    },
    sectionTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#e4d1ff',
        marginBottom: 10,
    },
    
});

export default VenueScreen;