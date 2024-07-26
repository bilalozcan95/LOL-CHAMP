import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type CardProps = {
  name: string;
  title: string;
  imageUrl: string;
  lore: string;
};

const Card: React.FC<CardProps> = ({ name, title, imageUrl, lore }) => {
  return (
    <View style={styles.card}>
            <View style={styles.subContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode='cover' />
      </View>

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.lore}>{lore}</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0a1428',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 200, 
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom:10
  },
  image: {
    width: '100%',
    height: '100%',
  },
  subContainer:{
   paddingVertical:10
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#c8aa6e',
  },
  title: {
    fontSize: 19,
    color: '#c8aa6e',
  },
  lore: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
});

export default Card;
