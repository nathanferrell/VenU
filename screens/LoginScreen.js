import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Placeholder logic for successful login
    if (username === 'test' && password === 'password') {
      navigation.replace('Main'); // Navigate to the main app flow after login
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <TextInput
        placeholder="Username"
        placeholderTextColor="#888" // Placeholder color
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#888" // Placeholder color
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000', // Background color of the screen
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: '#9363f4', // Title text color
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#9363f4', // Border color of input fields
    backgroundColor: '#333333', // Background color of input fields
    color: '#FFFFFF', // Text color of input fields
    marginBottom: 16,
    borderRadius: 4,
  },
  loginButton: {
    backgroundColor: '#9363f4', // Background color of the button
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 16,
    width: '80%',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF', // Text color of the button
    fontWeight: 'bold',
  },
});

export default LoginScreen;

