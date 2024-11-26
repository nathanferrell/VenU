import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';

const VenueScreen = () => {
    const navigation = useNavigation();

    const onSwipe = (gestureName) => {
        const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        if (gestureName === SWIPE_LEFT) {
            navigation.navigate('Home'); // Match this with the tab name in App.tsx
        } else if (gestureName === SWIPE_RIGHT) {
            navigation.navigate('Favorites'); // Match this with the tab name in App.tsx
        }
    };

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
    };

    return (
        <GestureRecognizer
            onSwipe={(direction) => onSwipe(direction)}
            config={config}
            style={styles.container}
        >
            <View>
                <Text style={styles.text}></Text>
            </View>
        </GestureRecognizer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
});

export default VenueScreen;

