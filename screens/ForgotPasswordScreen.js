import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function ForgotPasswordScreen({ navigation }) {
  const nav = useNavigation();
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');

  const send = () => {
    if (email === '') {
      Alert.alert('Error', 'Missing Fields', [
        {
          text: 'OKAY',
          onPress: () => console.log('Okay pressed'),
        },
      ]);
    } else {
      Alert.alert(
        'Success',
        'A message has been sent to your email address',
        [
          {
            text: 'OKAY',
            onPress: () => console.log('Okay pressed'),
          },
        ]
      );
    }
  };
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          mode="outlined"
          outlineColor={error ? 'red' : 'black'}
          activeOutlineColor={error ? 'red' : 'black'}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          onFocus={() => setError(false)}
        
        />
        <Button style={styles.button} mode="contained" onPress={send}>
          <Text style={styles.text}>Send Reset Password Email</Text>
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    margin: 20,
  },
  button: {
    width: '90%',
    padding: 10,
    backgroundColor: '#7dff83',
  },
  text: {
    color: 'black',
  },
});
