import React from 'react';
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    iconContainer: {
        padding: 10,  
    },
    gearIcon: {
        fontSize: 30,  
        color: "#e4d1ff",  
        marginRight: 20,   
    },
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
});

export const cardStyles = StyleSheet.create({
    card: {
      backgroundColor: '#1e1e1e', // Dark background for cards
      padding: 15,
      marginVertical: 5,
      marginRight: 10,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 3,
    },
  });
  
  export const commonStyles = StyleSheet.create({
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      marginVertical: 10,
      color: '#e4d1ff', // Light text color
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#f5f5f5', // Slightly lighter text for titles
    },
    text: {
      fontSize: 14,
      color: '#cccccc', // Light gray for secondary text
    },
  });
  
  export const appStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: 'black', // Dark background for the app
    },
  });
  
  export const screenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 10,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#e4d1ff',
        marginBottom: 10,
    },
    horizontalScroll: {
        flexDirection: 'row',
    },
    card: {
        width: 150, // Preserving the specified dimensions
        height: 100,
        backgroundColor: '#3c3c3c', // Medium gray background
        borderRadius: 10, // Slightly increased border radius for consistency
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    cardText: {
        fontSize: 18,
        color: '#e4d1ff',
    },
});