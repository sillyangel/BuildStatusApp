import React, { useState, useEffect } from 'react';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsScreen from './components/SettingsScreen';
import GithubBuildsStack from './components/GithubBuildStack';
import SetupScreen from './components/SetupScreen';

const Tab = createBottomTabNavigator();

const LightTheme = {
  dark: false,
  colors: {
    primary: 'tomato',
    background: '#fff',
    card: '#fff',
    text: '#2c2c2c',
    border: 'lightgray',
    notification: 'rgb(255, 69, 58)',
  },
};

const DarkTheme = {
  dark: true,
  colors: {
    primary: 'tomato',
    background: '#2f2f2f',
    card: '#222',
    text: '#fff',
    border: '#555',
    notification: 'rgb(255, 69, 58)',
  },
};



function MyTabs() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: 'gray' }}
    >
      <Tab.Screen 
        name="Builds" 
        component={GithubBuildsStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-build" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-settings" color={color} size={size} />
          ),
          headerShown: true,
        }}
        
      />
    </Tab.Navigator>
  );
}



export default function App() {
  const scheme = useColorScheme();
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const fetchifSetupComplete = async () => {
    const username = await AsyncStorage.getItem('githubUsername');
    const selectedRepos = JSON.parse(await AsyncStorage.getItem('githubRepos')) || [];
    setIsSetupComplete(!!username && selectedRepos.length > 0);
  }

  useEffect(() => {
    fetchifSetupComplete();
  }, []);

  if (isSetupComplete) {
    return <SetupScreen onSetupComplete={() => setIsSetupComplete(true)} theme={scheme === 'dark' ? DarkTheme : LightTheme} />;
  }

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
      <MyTabs />
    </NavigationContainer>
  );
}