import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import ArtistScreen from './screens/ArtistScreen';
import VenueScreen from './screens/VenueScreen';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SettingsModal from './screens/SettingsModal';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Mock authentication state for demo purposes
const isLoggedIn = false; // You can replace this with real authentication logic

// Custom App Logo Component for Header Left
function AppLogo({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
      <View style={styles.logoContainer}>
        <Image
          source={require('./images/logo.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
}

// Component for the settings icon in the header
function HeaderRightSettings({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('SettingsModal')}>
      <Ionicons 
        name="settings" 
        size={28} // Adjust the size of the gear icon here
        color="#e4d1ff" 
        style={styles.gearIcon} // Apply custom styles for positioning
      />
    </TouchableOpacity>
  );
}

// Home Stack with hidden header
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Artist Stack with hidden header
function ArtistStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ArtistScreen"
        component={ArtistScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Venue Stack with hidden header
function VenueStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VenueScreen"
        component={VenueScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Bottom Tabs with App Logo in Header Left and Custom Icons
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconSize = focused ? 60 : 50;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Artist') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Venue') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={iconSize} color={focused ? 'purple' : 'white'} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#e4d1ff',
          height: 80,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        headerLeft: () => <AppLogo navigation={navigation} />,
        headerStyle: {
          backgroundColor: 'black',
          height: 160,
        },
        headerTintColor: '#fff',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerTitle: '',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#e4d1ff',
          },
        }}
      />
      <Tab.Screen
        name="Artist"
        component={ArtistStack}
        options={{
          headerTitle: 'Favorites',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#e4d1ff',
            paddingLeft: 40,
          },
        }}
      />
      <Tab.Screen
        name="Venue"
        component={VenueStack}
        options={({ navigation }) => ({
          headerTitle: 'My Account',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#e4d1ff',
            paddingLeft: 40,
          },
          headerRight: () => <HeaderRightSettings navigation={navigation} />, // Place the gear icon directly in the Tab.Screen
        })}
      />
    </Tab.Navigator>
  );
}

// Main App with Welcome, Login, and Main Flow
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Main" : "Welcome"}>
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Main" 
          component={BottomTabs} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="SettingsModal" 
          component={SettingsModal} 
          options={{
            presentation: 'modal', // Updated syntax for modal presentation
            headerShown: false,
            cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// Global Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  logoContainer: {
    paddingLeft: 0,
  },
  headerTitleStyle: {
    paddingLeft: 40,
  },
  logo: {
    width: 148,
    height: 117,
  },
  gearIcon: {
    marginLeft: 20, // Adjust this value to move the gear icon left or right
    marginTop: 5, // Adjust this value to move the gear icon up or down
  },
});

