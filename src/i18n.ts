import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';


import enCommon from './locales/en/common.json';
import enChampionDetail from './locales/en/championDetail.json';
import enHomepage from './locales/en/homepage.json';
import enTabmenu from './locales/en/tabmenu.json';
import enSetting from './locales/en/settings.json'

import trCommon from './locales/tr/common.json';
import trChampionDetail from './locales/tr/championDetail.json';
import trHomepage from './locales/tr/homepage.json';
import trTabmenu from './locales/tr/tabmenu.json';
import trSetting from './locales/tr/settings.json'

const languageDetector = {
  type: 'languageDetector' as 'languageDetector',
  async: true,
  detect: async (callback: (lng: string | null) => void) => {
    const savedDataJSON = await AsyncStorage.getItem('language');
    const lng = savedDataJSON ? JSON.parse(savedDataJSON) : null;
    const selectLanguage = lng || 'tr';
    console.log(selectLanguage);
    callback(selectLanguage);
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    await AsyncStorage.setItem('language', JSON.stringify(lng));
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'tr',
    compatibilityJSON: 'v3',
    ns: ['tabmenu', 'common', 'homepage', 'championDetail',"settings"],
    resources: {
      en: {
        common: enCommon,
        championDetail: enChampionDetail,
        homepage: enHomepage,
        tabmenu: enTabmenu,
        settings:enSetting
      },
      tr: {
        common: trCommon,
        championDetail: trChampionDetail,
        homepage: trHomepage,
        tabmenu: trTabmenu,
        settings:trSetting
      },
    },
    defaultNS: 'homepage',
    react: {
      useSuspense: false,
    },
    debug: true, // Debugging etkinleştirildi
  });

export default i18n;
