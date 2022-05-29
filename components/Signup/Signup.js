import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { auth, db } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { TextInput } from 'react-native-paper';

function Signup({ setStatus }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [eyes, setEyes] = useState(true);
  const [eyes1, setEyes1] = useState(true);
  const handleSignUp = async (e) => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Missing Fields', [
        {
          text: 'OKAY',
          onPress: () => console.log('Okay pressed'),
        },
      ]);
      setError(true);
    } else if (password != confirmPassword) {
      Alert.alert('Error', 'Password Mismatch', [
        {
          text: 'OKAY',
          onPress: () => console.log('Okay pressed'),
        },
      ]);
    } else {
      try {
        const emailLower = email.toLowerCase();
        const res = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(db, 'users', res.user.uid), {
          uid: res.user.uid,
          username,
          email,
          createdAt: Timestamp.fromDate(new Date()),
          isOnline: false,
        }).then((res) => {
          Alert.alert('Success', 'Account Created', [
            {
              text: 'OKAY',
              onPress: () => console.log('Okay pressed'),
            },
          ]);
          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
          outlineColor={error && username === '' ? 'red' : 'black'}
          activeOutlineColor={
            error && username === '' ? 'red' : 'black'
          }
          mode="outlined"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          outlineColor={error && email === '' ? 'red' : 'black'}
          activeOutlineColor={error && email === '' ? 'red' : 'black'}
          mode="outlined"
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
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          style={styles.input}
          mode="outlined"
          secureTextEntry={eyes1}
          outlineColor={
            error && confirmPassword === '' ? 'red' : 'black'
          }
          activeOutlineColor={
            error && confirmPassword === '' ? 'red' : 'black'
          }
          right={
            <TextInput.Icon
              name="eye"
              onPress={() => {
                setEyes1(!eyes1);
              }}
            />
          }
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
        >
          <Text
            style={styles.buttonOutlineText}
            onPress={() => setStatus(true)}
          >
            Sign in to your account
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default Signup;

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
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
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
  buttonText: {
    color: '#F0F4F8',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#F0F4F8',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOtherContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonOther: {
    marginHorizontal: 20,
    marginTop: 5,
  },
  buttonGoogle: {
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonFacebook: {
    backgroundColor: 'blue',
  },
});
