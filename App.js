import 'react-native-gesture-handler';
import 'react-native-reanimated';
import SplashScreen from 'react-native-splash-screen';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import VenueScreen from './screens/VenueScreen';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SettingsModal from './screens/SettingsModal';
import { FavoritesProvider } from './screens/FavoritesContext';
import UserArtists from './components/UserArtists.js';
import FavoriteArtists from './components/UserArtists.js';
import RecentConcerts from './components/RecentConcerts.js';
import UserVenues from './components/UserVenues';
import ArtistDetails from './screens/ArtistDetails';
import { appStyles } from './styles/styles.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const isLoggedIn = false;

function AppLogo({ navigation }) {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('./images/logo.png')}
                    style={[styles.logo, { width: 100, height: 100 }]} // Adjust the width and height here
                    resizeMode="contain"
                />
            </View>
        </TouchableOpacity>
    );
}
function HeaderRightSettings({ navigation }) {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('SettingsModal')}>
            <Ionicons name="settings" size={36} color="#e4d1ff" style={styles.gearIcon} />
        </TouchableOpacity>
    );
}

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

function FavoritesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="FavoritesScreen"
                component={FavoritesScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

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

function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    let iconSize = focused ? 60 : 50;
                    let iconColor = '#e4d1ff'; // Change this line

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Favorites') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    } else if (route.name === 'Venue') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={iconSize} color={iconColor} />;
                },
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#4D4D4D',
                    height: 70,
                },
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
                options={{ headerTitle: '' }}
            />
            <Tab.Screen
                name="Favorites"
                component={FavoritesStack}
                options={{
                    headerTitle: 'Favorites',
                    headerTitleStyle: {
                        fontSize: 28,
                        fontWeight: 'bold',
                        color: '#e4d1ff',
                    },
                    headerLeftContainerStyle: {
                        paddingLeft: 10, // Reduce padding to bring the title closer
                    },
                    headerTitleContainerStyle: {
                        paddingLeft: 0, // Adjust to center the title better
                    },
                }}
            />
            <Tab.Screen
                name="Venue"
                component={VenueStack}
                options={({ navigation }) => ({
                    headerTitle: 'My Account',
                    headerTitleStyle: {
                        fontSize: 28,
                        fontWeight: 'bold',
                        color: '#e4d1ff',
                    },
                    headerLeftContainerStyle: {
                        paddingLeft: 0, // Reduce padding to balance the title position
                    },
                    headerTitleContainerStyle: {
                        paddingLeft: 0, // Adjust to center the title better
                    },
                    headerRight: () => <HeaderRightSettings navigation={navigation} />,
                })}
            />
        </Tab.Navigator>
    );
}

function App() {
    useEffect(() => {
        // Hide the splash screen after everything is ready
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000); // Adding a delay to ensure everything is fully loaded before hiding the splash screen
    }, []);

    return (
        <FavoritesProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={isLoggedIn ? "Main" : "Welcome"}>
                    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true,
                                            headerTitle: 'Back' }} />
                    <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
                   <Stack.Screen name="UserArtists" component={UserArtists} />
                   <Stack.Screen name="FavoriteArtists" component={FavoriteArtists} />
                  <Stack.Screen name="ArtistDetails" component={ArtistDetails} />
                   <Stack.Screen name="RecentConcerts" component={RecentConcerts} />
                   <Stack.Screen name="UserVenues" component={UserVenues} />
                    <Stack.Screen
                        name="SettingsModal"
                        component={SettingsModal}
                        options={{
                            presentation: 'transparentModal',
                            cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </FavoritesProvider>
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
    logo: {
        width: 148,
        height: 117,
    },
    gearIcon: {
        marginRight: 30,
        marginTop: 10,
    },
});
