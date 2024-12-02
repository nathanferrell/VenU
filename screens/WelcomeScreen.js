import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
  <ImageBackground
              source={require('../images/loginpage.png')}
              style={styles.container}
            >
    <View style={styles.container}>
      <Image 
        source={require('../images/logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      
      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.signupButton} 
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
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
    padding: 16,
  },
  logo: {
    width: 296,
    height: 234,
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: '#9363f4', 
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%', 
    alignItems: 'center', 
  },
  signupButton: {
    backgroundColor: '#753aeb', 
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%', 
    alignItems: 'center', 
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF', 
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;

