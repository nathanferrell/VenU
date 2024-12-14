import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#9363f4" style={styles.backButton} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }
    
    setIsLoading(true);
    try {
      // Firebase email authentication
      const userCredential = await auth().signInWithEmailAndPassword(
        username.trim(), 
        password
      );
      
      // User successfully logged in
      navigation.replace('Main');
    } catch (error) {
      // Handle different types of authentication errors
      switch (error.code) {
        case 'auth/invalid-email':
          Alert.alert('Login Error', 'Invalid email address');
          break;
        case 'auth/user-not-found':
          Alert.alert('Login Error', 'No user found with this email');
          break;
        case 'auth/wrong-password':
          Alert.alert('Login Error', 'Incorrect password');
          break;
        default:
          Alert.alert('Login Error', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../images/loginpage.png')}
      style={styles.container}
    >
      <View style={styles.container}>
        <Text style={styles.title}></Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#888" 
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#888" 
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Don't have an account? Register</Text>
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
    width: '100%',
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
  registerText: {
    color: '#9363f4',
    marginTop: 15,
    textAlign: 'center',
  },
  backButton: {
    paddingLeft: 10,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'transparent',
  }
});

export default LoginScreen;
