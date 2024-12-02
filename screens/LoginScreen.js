import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const LoginScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#9363f4" style={{ paddingLeft: 10,
            justifyContent: 'center', 
            alignItems: 'center',
           backgroundColor: 'transparent', }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
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
  <ImageBackground
        source={require('/Users/laila/Downloads/VenU2/images/loginpage.png')}
        style={styles.container}
      >
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <TextInput
        placeholder="Username"
        placeholderTextColor="#888" 
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#888" 
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
   },
  title: {
    fontSize: 24,
    color: '#9363f4',
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 60,
    padding: 15,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#9363f4', 
    backgroundColor: '#333333', 
    color: '#FFFFFF', 
    marginBottom: 16,
    borderRadius: 4,
  },
  loginButton: {
    backgroundColor: '#9363f4', 
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 16,
    width: '80%',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF', 
    fontWeight: 'bold',
  },
});

export default LoginScreen;

