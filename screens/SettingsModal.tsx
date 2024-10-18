import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SettingsModal = ({ navigation }) => {
  const handleSignOut = () => {
    // Logic for signing out, such as clearing user data
    navigation.replace('Welcome');
  };

  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Translucent black background
  },
  signOutButton: {
    backgroundColor: '#FF5722', // Button color
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF', // White text color
    fontWeight: 'bold',
  },
});

export default SettingsModal;
