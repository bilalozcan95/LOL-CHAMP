// screens/Search.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import SearchInput from '../components/SearchInput';
import HeroCard from '../components/HeroCard';
import { useNavigation } from '@react-navigation/native';
import { screenNames } from '../constants/screenNames';
import { useGetAllChampions } from '../api/hooks/useGetAllChampions';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParams } from 'src/navigation/StackNavigator';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, error, isLoading } = useGetAllChampions();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#c8aa6e" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Error fetching data: {error.message}</Text>
      </View>
    );
  }

  const champions = data.data;
  const championList = Object.keys(champions).map((key) => champions[key]);

  const filteredHeroes = championList.filter(hero =>
    hero.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleHeroPress = (hero: any) => {
    navigation.navigate(screenNames.ChampionDetail, { name: hero.id });
  };

  return (
    <View style={styles.container}>
      <SearchInput value={searchTerm} onChangeText={setSearchTerm} />
      <FlatList
        data={filteredHeroes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HeroCard hero={item} onPress={() => handleHeroPress(item)} />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No heroes found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: '#1a2438',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#1a2438',
    paddingHorizontal: 20,
  },
  text: {
    color: '#c8aa6e',
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#c8aa6e',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Search;
