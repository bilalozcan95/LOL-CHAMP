import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {screens} from '../screens';
import {screenNames} from '../constants/screenNames';
import {StatusBar} from 'react-native';
import TabNavigator from './TabNavigator';

export type RootStackParams = {
  ChampionDetail: {name: string};
  TabNavigator: any;
};

const Stack = createStackNavigator<RootStackParams>();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#1a2438" />
      <Stack.Navigator
        initialRouteName="TabNavigator"
        screenOptions={{
          headerStyle: {backgroundColor: '#1a2438'},
          headerTintColor: '#c8aa6e',
          headerTitleStyle: {fontWeight: 'bold'},
        }}>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={screenNames.ChampionDetail}
          component={screens.ChampionDetail}
          options={({route}) => ({title: route.params.name})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
