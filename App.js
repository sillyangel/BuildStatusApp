import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsScreen from './components/SettingsScreen';
import GithubBuildsStack from './components/GithubBuildStack';
import SetupScreen from './components/SetupScreen';

const Tab = createBottomTabNavigator();


function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarActiveTintColor: '#222', tabBarInactiveTintColor: 'gray' }}
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

  if (!isSetupComplete) {
    return <SetupScreen onSetupComplete={() => setIsSetupComplete(true)} />;
  }

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <MyTabs />
    </NavigationContainer>
  );
}