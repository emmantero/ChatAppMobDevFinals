import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { auth, db } from '../../firebase';
import { AuthContext } from '../Context/Auth';

export default function ContactList({ visible }) {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const navigation = useNavigation();

  const getAllUsers = async () => {
    const ref = collection(
      db,
      'users',
      auth.currentUser?.uid,
      'friends'
    );
    const data = await getDocs(ref);
    setFriends(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  useEffect(() => {
    getAllUsers();
  }, [visible]);

  return (
    <SafeAreaView style={styles.containerResults}>
      <ScrollView>
        {friends.length > 0 ? (
          friends.map((f) => (
            <>
              <View key={f.id} style={styles.container}>
                <TouchableOpacity
                  onPress={() => {
                    console.log('navigateChat');
                    navigation.navigate('Chat', {
                      uid: f.uid,
                      name: f.username,
                      email: f.email,
                    });
                  }}
                >
                  <Text>Email: {f.email}</Text>
                  <Text>Username:{f.username}</Text>
                  <Text>Username:{user.username}</Text>
                </TouchableOpacity>
              </View>
            </>
          ))
        ) : (
          <View style={styles.container}>
            <Text style={styles.text}>
              You have no contacts as of the moment
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1,
    padding: 10,
    paddingBottom: 20,
    marginBottom: 20,
    // height: '20px',
  },
  containerResults: {
    height: '80%',
    width: '80%',
    zIndex: -1,
  },
  text: {
    zIndex: -1,
    fontSize: 13,
    justifyContent: 'center',
    // min-width: max-content
    minWidth: 'max-content'
  },
});
