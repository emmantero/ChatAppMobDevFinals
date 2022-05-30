import React, { useEffect, useState, useContext } from 'react';
import { auth, db } from '../../firebase';
import { useNavigation } from '@react-navigation/core';
import { Avatar } from 'react-native-paper';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { AuthContext } from '../Context/Auth';

export default function Profile() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});

  // useEffect(() => {

  // }, [user]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => alert(error.message));
  };


  return (
    <>
      <View style={styles.container}>
        <Avatar.Image size={100} source={require('../../assets/default-avatar.jpg')} style={styles.userImg} />
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{auth.currentUser?.email}</Text>
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.buttonSignOut}
        >
          <Text style={styles.buttonTextSignOut}>Sign out</Text>
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
  userImg: {
    // marginTop: 100,
  },
  username: {
    fontSize: 38,
  },
  email: {
    fontSize: 18
  },
  buttonSignOut: {
    backgroundColor: '#486581',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonTextSignOut: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
