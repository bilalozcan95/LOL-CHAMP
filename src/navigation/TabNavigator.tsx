import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screens } from '../screens';
import { screenNames } from '../constants/screenNames';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { t } = useTranslation('tabmenu'); 

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case screenNames.HomePage:
              iconName = 'home';
              break;
            case screenNames.Search:
              iconName = 'search';
              break;
            case screenNames.SettingsScreen:
              iconName = 'cog';
              break;
            default:
              iconName = 'alert-circle-outline';
              break;
          }

          return <Icon name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: '#c8aa6e',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { 
          backgroundColor: '#1a2438', 
          paddingVertical: 10, 
          height: 70,  
       
        },
        tabBarLabelStyle: {
          fontSize: 17,
          marginBottom: 10, 
        },
        headerStyle: { backgroundColor: '#1a2438' },
        headerTintColor: '#c8aa6e',
        headerTitleStyle: { fontWeight: 'bold' },
      })}
    >
      <Tab.Screen
        name={screenNames.HomePage}
        component={screens.HomePage}
        options={{ tabBarLabel: t('homeTabLabel'), headerTitle: t('homeHeaderTitle') }}
      />
      <Tab.Screen
        name={screenNames.Search}
        component={screens.Search}
        options={{ tabBarLabel: t('searchTabLabel'), headerTitle: t('searchHeaderTitle') }}
      />
      <Tab.Screen
        name={screenNames.SettingsScreen}
        component={screens.SettingsScreen}
        options={{ tabBarLabel: t('settingsTabLabel'), headerTitle: t('settingsHeaderTitle') }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
