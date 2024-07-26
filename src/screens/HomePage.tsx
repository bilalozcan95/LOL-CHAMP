import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useGetAllChampions } from '../api/hooks/useGetAllChampions';
import HomePageCarousel from '../components/HomePageCarousel';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const { t } = useTranslation('homepage');
  const {language}=useLanguage()
  const { data, error, isLoading,refetch } = useGetAllChampions();
  useEffect(() => {
    refetch(); 
  }, [language]);

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
   <Text style={styles.errorText}>{t('error', { message: error.message })}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HomePageCarousel data={Object.values(data?.data || [])} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2438',
    paddingTop: 20,
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
  errorText: {
    color: 'red',
  },
});

export default HomePage;
