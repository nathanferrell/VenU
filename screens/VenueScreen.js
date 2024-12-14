import React, { useRef, useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, ActivityIndicator, FlatList,TouchableOpacity, PanResponder, Animated  } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';
import { getJSON } from '../services/api'; 
import { buildPhotoUrl } from '../utility/formatting'; 
import { PhotoView } from '../components/presentation';


//const flickrApiURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${yourKeyHere}&user_id=201776761@N04&extras=url_m&format=json&nojsoncallback=1`;
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
    };

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
    };

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