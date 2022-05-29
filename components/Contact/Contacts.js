import React, { useContext, useEffect, useState } from 'react';
import { Button, Text, TextInput } from 'react-native';
import Searchbar from './Searchbar';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { AuthContext } from '../Context/Auth';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import ContactList from './ContactList';

export default function Body() {
  const [userSearchText, setUserSearchText] = useState('');
  const [userSearch, setUserSearch] = useState([]);
  const [userSearch2, setUserSearch2] = useState([]);
  const { user } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Searchbar
        setUserSearch={setUserSearchText}
        text={userSearchText}
        visible={visible}
        setVisible={setVisible}
      />
      <View style={styles.containerResults}>
        <ContactList visible={visible} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    zIndex: -1,
    height: '100%',
    // height: '20px',
  },
  containerResults: {
    height: '90%',
    width: '80%',
    alignItems: 'center',
    paddingTop: 80,
    zIndex: -1,
  },
  text: {
    zIndex: -1,
    fontSize: 16,
  },
});
