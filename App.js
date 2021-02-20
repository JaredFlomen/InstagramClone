import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LandingScreen from './components/auth/Landing';

const Stack = createStackNavicator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navitor initialRouteName='Landing'>
        <Stack.Screen
          name='Landing'
          component={LandingScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navitor>
    </NavigationContainer>
  );
}
