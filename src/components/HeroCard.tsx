// components/HeroCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface HeroCardProps {
  hero: any;
  onPress: () => void;
}

const HeroCard: React.FC<HeroCardProps> = ({ hero, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <LinearGradient
 colors={['#c8aa6e', '#a8894f']}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Image source={{ uri: `http://ddragon.leagueoflegends.com/cdn/11.1.1/img/champion/${hero.id}.png` }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{hero.name}</Text>
          <Text style={styles.title}>{hero.title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 12,
    borderRadius: 12,
    overflow: 'hidden', 
  },
  card: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    color: '#1a2438',
  },
});

export default HeroCard;
