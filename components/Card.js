import React from 'react';
import { View } from 'react-native';
import { cardStyles } from '../styles';

const Card = ({ children }) => (
  <View style={cardStyles.card}>
    {children}
  </View>
);

export default Card;