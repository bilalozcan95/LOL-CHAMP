import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import StackNavigator from './src/navigation/StackNavigator';
import './src/setupReactQuery';
import {I18nextProvider} from 'react-i18next';
import SplashScreen from 'react-native-splash-screen';
import i18n from './src/i18n';
import {LanguageProvider} from './src/context/LanguageContext';
import 'intl';
import 'intl-pluralrules';

const queryClient = new QueryClient();

const App = (): React.JSX.Element => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <LanguageProvider>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <StackNavigator />
          </SafeAreaProvider>
        </QueryClientProvider>
      </I18nextProvider>
    </LanguageProvider>
  );
};

export default App;
