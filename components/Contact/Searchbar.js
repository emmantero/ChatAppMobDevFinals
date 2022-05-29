import {
  collection,
  getDoc,
  getDocs,
  where,
  query,
  doc,
  addDoc,
  Timestamp,
  setDoc,
} from 'firebase/firestore';
import React, { useContext, useState } from 'react';
// import { TextInput } from 'react-native';
import { View, StyleSheet, Alert } from 'react-native';
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  TextInput,
} from 'react-native-paper';
import { auth, db } from '../../firebase';
import { AuthContext } from '../Context/Auth';

export default function Searchbar({
  text,
  setUserSearch,
  setVisible,
  visible,
}) {
  const [users, setUsers] = useState({});
  const { user } = useContext(AuthContext);

  const onSearch = async () => {
    console.log(text.toLowerCase());
    // const docRef = doc(db, "users", "SF");
    const q = query(
      collection(db, 'users'),
      where('email', '==', text.toLowerCase())
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setUsers(doc.data());
    });
    console.log(querySnapshot.size);
    if (text === user.email) {
      Alert.alert('Error', 'You cant search own email', [
        {
          text: 'OKAY',
          onPress: () => console.log('Okay pressed'),
        },
      ]);
    } else if (querySnapshot.size === 0) {
      Alert.alert('Error', 'No users found', [
        {
          text: 'OKAY',
          onPress: () => console.log('Okay pressed'),
        },
      ]);
    } else {
      setVisible(true);
    }
  };

  const checkFriend = async () => {
    // const id1 = users.uid;
    // // > auth.currentUser?.uid
    // //   ? users.uid
    // //   : auth.currentUser?.uid;
    // const id2 = auth.currentUser?.uid;
    // // > auth.currentUser?.uid
    // //   ? auth.currentUser?.uid
    // //   : users.uid;

    // const id =
    //   users.uid > auth.currentUser?.uid
    //     ? `${auth.currentUser?.uid + users.uid}`
    //     : `${users.uid + auth.currentUser?.uid}`;

    const docRef = doc(
      db,
      'users',
      auth.currentUser?.uid,
      'friends',
      users.uid
    );
    const docs = await getDoc(docRef);

    if (docs.exists()) {
      Alert.alert('Error', 'You are already connected', [
        {
          text: 'OKAY',
          onPress: () => console.log('Okay pressed'),
        },
      ]);
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
      setDoc(doc(db, 'users', user.uid, 'friends', users.uid), {
        connectionCreatedAt: Timestamp.fromDate(new Date()),
        ...users,
      }).then(async () => {
        setDoc(doc(db, 'users', users.uid, 'friends', user.uid), {
          connectionCreatedAt: Timestamp.fromDate(new Date()),
          ...user,
        }).then(() => {
          Alert.alert('Success', 'You are now connected', [
            {
              text: 'OKAY',
              onPress: () => console.log('Okay pressed'),
            },
          ]);
        });
      });
      // setDoc(doc(db, 'friends', id), {
      //   createdAt: Timestamp.fromDate(new Date()),
      //   id1: id1,
      //   id2: id2,
      // }).then((res) => {
      //   Alert.alert('Success', 'You are now connected', [
      //     {
      //       text: 'OKAY',
      //       onPress: () => console.log('Okay pressed'),
      //     },
      //   ]);
      // });
    }
  };

  const hideModal = () => {
    setUsers({});
    setVisible(false);
  };
  return (
    <>
      <View style={styles.container}>
        <TextInput
          placeholder="Search user email"
          value={text}
          onChangeText={(text) => setUserSearch(text)}
          onSubmitEditing={onSearch}
          mode="outlined"
          right={<TextInput.Icon name="magnify" onPress={onSearch} />}
        />
      </View>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.containerStyle}
          >
            <Text style={styles.header}>USERS</Text>
            <Button
              mode="contained"
              // key={u.username}
              style={styles.button}
              onPress={checkFriend}
            >
              <Text>{users.email}</Text>
            </Button>
          </Modal>
        </Portal>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    position: 'absolute',
    top: 40,
    zIndex: 1,
  },
  containerModal: {
    width: '90%',
    flexDirection: 'column',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    top: 40,
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    height: '70%',
    zIndex: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    paddingTop: 5,
    borderWidth: 2,
  },
  button: {
    backgroundColor: 'white',
    width: '90%',
    paddingVertical: 10,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'flex-start',
  },
  header: {
    position: 'absolute',
    top: 20,
  },
});
