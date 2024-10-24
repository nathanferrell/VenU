import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';

const VenueScreen = () => {
    const navigation = useNavigation();

    const onSwipeRight = () => {
        navigation.navigate('Favorites');
    };

    const onSwipeLeft = () => {
        navigation.navigate('Home');
    };

    return (
        <GestureRecognizer
            onSwipeRight={onSwipeRight}
            onSwipeLeft={onSwipeLeft}
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

