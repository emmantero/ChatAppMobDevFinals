import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Logo from './Logo';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Logo />
      <Text>Splash Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
