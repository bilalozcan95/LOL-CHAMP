// src/screens/SettingsScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import i18n from '../i18n';

const SettingsScreen: React.FC = () => {
  const { t } = useTranslation("settings");
  const { changeLanguage } = useLanguage();
  const [isEnglish, setIsEnglish] = useState(i18n.language === 'en');

  useEffect(() => {
    setIsEnglish(i18n.language === 'en');
  }, [i18n.language]);

  const toggleSwitch = (language: 'en' | 'tr') => {
    setIsEnglish(language === 'en');
    changeLanguage(language);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('selectLanguage')}</Text>
      <View style={styles.switchRow}>
        <Text style={styles.languageText}>Türkçe</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#c8aa6e' }}
          thumbColor={!isEnglish ? '#c8aa6e' : '#767577'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => toggleSwitch('tr')}
          value={!isEnglish}
        />
      </View>
      <View style={styles.switchRow}>
        <Text style={styles.languageText}>English</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#c8aa6e' }}
          thumbColor={isEnglish ? '#c8aa6e' : '#767577'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => toggleSwitch('en')}
          value={isEnglish}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2438',
    alignItems: 'center',
    padding: 20,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%', // Align switches with some padding
    backgroundColor:"#3e3e3e",
    padding:4,
    paddingHorizontal:12,
    borderRadius:15
  },
  languageText: {
    fontSize: 22,
    color: '#fff',
  },
  title:{
    fontSize:30,
    color:"#c8aa6e",
    marginBottom:30
  }
});
