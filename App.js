// In App.js in a new project

import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AuthProvider from './components/Context/Auth';
import ChatScreen from './screens/ChatScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import { Button } from 'react-native-paper';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={({ navigation, route }) => ({
              headerTitle: 'Chat app Reset Password',
            })}
            name="Forgot"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Chat"
            component={ChatScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
