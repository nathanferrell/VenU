import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const SettingsModal = ({ navigation }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleSignOut = () => {
        setIsVisible(false);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
        });
    };

    const handleClose = () => {
        setIsVisible(false);
        navigation.goBack();
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={handleClose}
            style={styles.modal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
        >
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Settings</Text>
                <View style={styles.buttonContainer}>
                    <Button title="Sign Out" color="#9363f4" onPress={handleSignOut} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Close" color="#9363f4" onPress={handleClose} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 30,
        height: '50%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#9363f4',
    },
    buttonContainer: {
        marginVertical: 10,
    },
});

export default SettingsModal;

