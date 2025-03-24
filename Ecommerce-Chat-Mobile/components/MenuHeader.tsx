import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MenuHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Menu Header</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#0EDFBD',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MenuHeader; 