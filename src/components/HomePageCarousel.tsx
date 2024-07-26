import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/Card';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParams } from 'src/navigation/StackNavigator';

const { width } = Dimensions.get('window');

const HomePageCarousel: React.FC<{ data: any[] }> = ({ data }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ChampionDetail', { name: item.id })}>
      <View style={styles.cardContainer}>
        <Card
          name={item.name}
          title={item.title}
          imageUrl={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${item.id}_0.jpg`}
          lore={item.blurb}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item: any) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.carouselContainer}
      snapToInterval={width * 0.8 + 10}
      decelerationRate="fast"
    />
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    alignItems: 'center',
  },
  cardContainer: {
    width: width * 0.8,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#c8aa6e',
    borderRadius: 10,
    overflow: 'hidden',
    height: '98%', 
    
  },
});

export default HomePageCarousel;
