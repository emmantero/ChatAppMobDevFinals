import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { auth } from '../../firebase';
import {
  signInWithEmailAndPassword,
} from 'firebase/auth';


export default function Login({ setStatus }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [eyes, setEyes] = useState(true);

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Missing Fields', [
        {
          text: 'OKAY',
          onPress: () => console.log('Okay pressed'),
        },
      ]);
      setError(true);
    } else {
      const emailLower = email.toLowerCase();
      await signInWithEmailAndPassword(auth, emailLower, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log('Logged in with:', user.email);
          navigation.replace('Home');
        })
        .catch((error) =>
          Alert.alert('Error', 'No Users Found', [
            {
              text: 'OKAY',
              onPress: () => console.log('Okay pressed'),
            },
          ])
        );
    }
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          mode="outlined"
          outlineColor={error && email === '' ? 'red' : 'black'}
          activeOutlineColor={error && email === '' ? 'red' : 'black'}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry={eyes}
          mode="outlined"
          outlineColor={error && password === '' ? 'red' : 'black'}
          activeOutlineColor={
            error && password === '' ? 'red' : 'black'
          }
          right={
            <TextInput.Icon
              name="eye"
              onPress={() => {
                setEyes(!eyes);
              }}
            />
          }
        />
      </View>
      <View
        style={[styles.inputContainer, { alignItems: 'flex-end' }]}
      >
        <Button
          onPress={() => {
            navigation.navigate('Forgot');
          }}
          style={{ marginTop: 10 }}
        >
          <Text style={{ color: 'gray' }}>Forgot Password?</Text>
        </Button>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonTextLogin}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() => setStatus(false)}
        >
          <Text style={styles.buttonOutlineText}>
            Create an account
          </Text>
        </TouchableOpacity>
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
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#334E68',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: '#486581',
    marginTop: 5,
  },
  buttonTextLogin: {
    color: '#F0F4F8',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#F0F4F8',
    fontWeight: '700',
    fontSize: 16,
  },
  textDivider: {
    display: 'flex',
    alignItems: 'center',
  },
});
