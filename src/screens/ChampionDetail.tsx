// src/screens/ChampionDetail.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, StatusBar, FlatList, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useChampionDetail } from '../api/hooks/useChampionDetail';
import SkillModal, { Skill } from '../components/SkillModal';
import Carousel from '../components/Carousel';
import ImageModal from '../components/ImageModal';
import { useTranslation } from 'react-i18next';

type RootStackParamList = {
  ChampionDetail: { name: string };
};

type ChampionDetailRouteProp = RouteProp<RootStackParamList, 'ChampionDetail'>;

const { width } = Dimensions.get('window');

const ChampionDetail: React.FC = () => {
  const { t } = useTranslation("championDetail");
  const route = useRoute<ChampionDetailRouteProp>();
  const { name } = route.params;
  const { data, error, isLoading } = useChampionDetail(name);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [skillModalVisible, setSkillModalVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<{ skill: Skill, index: number } | null>(null);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#c8aa6e" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{t('errorFetchingData', { message: error.message })}</Text>
      </View>
    );
  }

  const champion = data?.data[name];
  const splashImageUrl = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`;

  const handleItemPress = (item: any) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleSkillPress = (skill: Skill, index: number) => {
    setSelectedSkill({ skill, index });
    setSkillModalVisible(true);
  };

  const renderSpellItem = ({ item, index }: { item: Skill, index: number }) => (
    <TouchableOpacity
      style={styles.spellContainer}
      onPress={() => handleSkillPress(item, index)}
    >
      <Image
        source={{ uri: `http://ddragon.leagueoflegends.com/cdn/9.24.2/img/spell/${item.image.full}` }}
        style={styles.spellImage}
      />
      <Text style={styles.spellName} numberOfLines={2} ellipsizeMode="tail">{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1a2438" />
      <ImageBackground source={{ uri: splashImageUrl }} style={styles.backgroundImage} imageStyle={{ opacity: 0.5 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image source={{ uri: `http://ddragon.leagueoflegends.com/cdn/11.1.1/img/champion/${champion.id}.png` }} style={styles.championImage} />
              <Text style={styles.name}>{champion.name}</Text>
              <Text style={styles.title}>{champion.title}</Text>
            </View>
            <Text style={styles.sectionTitle}>{t('abilities')}</Text>
            <View style={styles.spellListContainer}>
              <FlatList
                data={champion.spells}
                renderItem={renderSpellItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <Text style={styles.lore}>{champion.lore}</Text>
            <Text style={styles.sectionTitle}>{t('skins')}</Text>
            <View style={styles.skinsContainer}>
              {champion.skins && <Carousel data={champion.skins} onItemPress={handleItemPress} championId={champion.id} />}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>

      {selectedItem && (
        <ImageModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          imageUrl={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${selectedItem.num}.jpg`}
          name={selectedItem.name}
        />
      )}

      {selectedSkill && (
        <SkillModal
          visible={skillModalVisible}
          onClose={() => setSkillModalVisible(false)}
          skill={selectedSkill.skill}
          championKey={champion.key}
          skillIndex={selectedSkill.index}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(26, 36, 56, 0.8)',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: '#1a2438',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  championImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#c8aa6e',
  },
  title: {
    fontSize: 24,
    color: '#c8aa6e',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c8aa6e',
    marginBottom: 15,
  },
  lore: {
    fontSize: 18,
    color: '#fff',
    marginTop: 3,
    textAlign: 'justify',
  },
  spellListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 40, 
  },
  spellContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
    width: (width - 40) / 4 - 10, 
  },
  spellImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#c8aa6e',
  },
  spellName: {
    fontSize: 14,
    color: '#c8aa6e',
    marginTop: 5,
    textAlign: 'center', 
  },
  skinsContainer: {
    marginTop: 0
  }
});

export default ChampionDetail;
