import 'react-native-gesture-handler';
import 'react-native-reanimated';
import SplashScreen from 'react-native-splash-screen';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

// Import all your existing screens
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
import VenueDetails from './screens/VenueDetails';
import ConcertDetail from './screens/ConcertDetails';
import UpcomingConcerts from './components/UpcomingConcerts';
import { styles, cardStyles, commonStyles } from './styles.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppLogo({ navigation }) {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('./images/logo.png')}
                    style={[styles.logo, { width: 100, height: 100 }]}
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
                    let iconColor = '#e4d1ff';

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
                headerLeftContainerStyle: {
                    paddingLeft: 20,
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
                        fontSize: 30,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: '#d1a7ff',
                        marginLeft: 'auto',   
                        marginRight: 'auto',
                    },
                    headerLeftContainerStyle: {
                        paddingLeft: 20, 
                    },
                    headerTitleContainerStyle: {
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        flex: 1, 
                    },
                }}
            />
            <Tab.Screen
                name="Venue"
                component={VenueStack}
                options={({ navigation }) => ({
                    headerTitle: 'Account',
                    headerTitleStyle: {
                        fontSize: 30,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: '#d1a7ff',
                        marginLeft: 'auto',   
                        marginRight: 'auto',
                        paddingLeft: 10,
                    },
                    headerLeftContainerStyle: {
                        paddingLeft: 20, 
                    },
                    headerTitleContainerStyle: {
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        flex: 1, 
                    },
                    headerRight: () => <HeaderRightSettings navigation={navigation} />,
                })}
            />
        </Tab.Navigator>
    );
}

function App() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);

    // Handle user state changes
    function onAuthStateChanged(authUser) {
        setUser(authUser);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        // Subscribe to authentication state changes
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

        // Hide the splash screen after authentication check
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000);

        // Unsubscribe on unmount
        return subscriber;
    }, []);

    // If still initializing, you might want to show a loading screen
    if (initializing) {
        return null; // Or a loading component
    }

    return (
        <FavoritesProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={user ? "Main" : "Welcome"}>
                    <Stack.Screen 
                        name="Welcome" 
                        component={WelcomeScreen} 
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="Login" 
                        component={LoginScreen} 
                        options={{ 
                            headerShown: true,
                            headerTitle: 'Back' 
                        }} 
                    />
                    <Stack.Screen 
                        name="Main" 
                        component={BottomTabs} 
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen name="UserArtists" component={UserArtists} />
                    <Stack.Screen name="FavoriteArtists" component={FavoriteArtists} />
                    <Stack.Screen name="ArtistDetails" component={ArtistDetails} />
                    <Stack.Screen name="RecentConcerts" component={RecentConcerts} />
                    <Stack.Screen name="UserVenues" component={UserVenues} />
                    <Stack.Screen 
                        name="VenueDetails" 
                        component={VenueDetails} 
                        options={{ title: 'Venue Details' }} 
                    />
                    <Stack.Screen 
                        name="ConcertDetail" 
                        component={ConcertDetail} 
                        options={{ title: 'Concert Details' }} 
                    />
                    <Stack.Screen 
                        name="UpcomingConcerts" 
                        component={UpcomingConcerts} 
                        options={{ title: 'Upcoming Concerts' }} 
                    />
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
