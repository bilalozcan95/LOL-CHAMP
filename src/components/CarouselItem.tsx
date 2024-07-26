import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CarouselItemProps {
  activeItem: number;
  item: any;
  index: number;
  onPress: () => void;
  championId: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ activeItem, item, index, onPress, championId }) => {
  const imageUrl = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_${item.num}.jpg`;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: imageUrl }}
        style={[
          styles.image,
          // { opacity: activeItem === index ? 1 : 0.5, transform: activeItem === index ? [{ scale: 1.1 }] : [{ scale: 1 }] },
        ]}
        onError={() => console.error('Failed to load image:', imageUrl)}
      />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 225,
    objectFit:"fill",
    borderRadius: 15,
  },
  name: {
    marginTop: 5,
    fontSize: 16,
    color: '#c8aa6e',
  },
});

export default CarouselItem;
