import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import HomeScreen from './screens/HomeScreen';
import ArtistScreen from './screens/ArtistScreen';
import VenueScreen from './screens/VenueScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Custom App Logo Component for Header Left
function AppLogo({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
      <View style={styles.logoContainer}>
        <Image
          source={require('./images/logo.png')} // Replace with your actual logo path
          style={styles.logo} // Customize size and positioning
          resizeMode="contain"
        />
      </View>
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
        options={{ headerShown: false }} // Hides the stack header
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
        options={{ headerShown: false }} // Hides the stack header
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
        options={{ headerShown: false }} // Hides the stack header
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
          let iconSize = focused ? 60 : 50; // Customize size for focused and unfocused icons

          // Set icons based on route names using Ionicons
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'; // Correct Ionicons names
          } else if (route.name === 'Artist') {
            iconName = focused ? 'heart' : 'heart-outline'; // Correct Ionicons names
          } else if (route.name === 'Venue') {
            iconName = focused ? 'person' : 'person-outline'; // Correct Ionicons names
          }

          // Return the Ionicon component with dynamic size
          return <Ionicons name={iconName} size={iconSize} color={focused ? 'purple' : 'white'} />;
        },
        tabBarShowLabel: false, // Remove labels under the icons
        tabBarStyle: {
          backgroundColor: '#e4d1ff', // Light purple background for the bottom tab bar
          height: 80,
        },
        tabBarActiveTintColor: 'white', // Color for focused icons
        tabBarInactiveTintColor: 'black', // Color for unfocused icons
        headerLeft: () => <AppLogo navigation={navigation} />, // Make logo clickable
        headerStyle: {
          backgroundColor: 'black', // Keep the current background color
          height: 160, // Set the height of the header
        },
        headerTintColor: '#fff', // Keep the white text color
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerTitle: '', // Set title for Home screen
          headerTitleAlign: 'center', // Center the title
          headerTitleStyle: {
             fontSize: 28,  // Adjust the font size
             fontWeight: 'bold',  // Set the font weight
             color: '#e4d1ff',  // Change the color to white
           },
        }}
      />
      <Tab.Screen
        name="Artist"
        component={ArtistStack}
        options={{
          headerTitle: 'Favorites', // Set title for Artist screen
          headerTitleAlign: 'center', // Center the title
          headerTitleStyle: {
             fontSize: 28,  // Adjust the font size
             fontWeight: 'bold',  // Set the font weight
             color: '#e4d1ff',  // Change the color to white
             paddingLeft: 40,
           },
        }}
      />
      <Tab.Screen
        name="Venue"
        component={VenueStack}
        options={{
          headerTitle: 'My Account', // Set title for Venue screen
          headerTitleAlign: 'center', // Center the title
          headerTitleStyle: {
             fontSize: 28,  // Adjust the font size
             fontWeight: 'bold',  // Set the font weight
             color: '#e4d1ff',  // Change the color to white
             paddingLeft: 40,
           },
        }}
      />
    </Tab.Navigator>
  );
}


// Main App with NavigationContainer and only BottomTabs
export default function App() {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}

// Global Styles (can be used for other screen components)
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'black', // Black background for all screens
  },
  logoContainer: {
    paddingLeft: 0, // Add some padding to keep it from the left edge
  },
  headerTitleStyle: {
    paddingLeft: 40, // Further shift the title to the right
  },
  logo: {
    width: 148,
    height: 117,
  },
});

