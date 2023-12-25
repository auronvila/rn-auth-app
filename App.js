import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import {Colors} from './constants/styles';
import AuthContextProvider, {AuthContext} from './store/auth-context';
import {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

function AuthStack() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.primary100},
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Signup" component={SignupScreen}/>
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.primary100},
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen}/>
    </Stack.Navigator>
  );
}

function Navigation() {
  const {isAuthenticated, token, authenticate} = useContext(AuthContext)
  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack/>}
      {isAuthenticated && <AuthenticatedStack/>}
    </NavigationContainer>
  );
}

function Root() {
  const [isLoggingIn, setIsLoggingIn] = useState(true)
  const { token, authenticate, updateRefreshToken } = useContext(AuthContext);

  useEffect(() => {
    async function getToken() {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          authenticate(storedToken);
        }
      } catch (e) {
        console.error('Error getting token:', e);
      } finally {
        setIsLoggingIn(false);
      }
    }

    getToken();

    const intervalId = setInterval(async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          authenticate(storedToken);
        }
      } catch (e) {
        console.error('Error refreshing token:', e);

        const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
        if (storedRefreshToken) {
          updateRefreshToken(storedRefreshToken);
        }
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [authenticate, updateRefreshToken]);


  if (isLoggingIn) {
    <AppLoading/>
  }
  return <Navigation/>
}

export default function App() {
  return (
    <>
      <StatusBar style="light"/>
      <AuthContextProvider>
        <Root/>
      </AuthContextProvider>
    </>
  );
}
