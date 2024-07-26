import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AllChampions:React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>All Champions</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a2438',
  },
  text: {
    color: '#c8aa6e',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AllChampions;
