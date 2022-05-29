import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';

export default function Logo() {
  return (
    <>
      <Image
        source={require('../assets/Logo.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Ayaro</Text>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '50%',
    height: '20%',
    marginBottom: 10,
  },
  text: {
    color: 'black',
    fontWeight: '700',
    fontSize: 20,
    paddingBottom: 30,
  },
});
