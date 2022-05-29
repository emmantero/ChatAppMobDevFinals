import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState, useContext } from 'react';
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../components/Context/Auth';

export default function ChatScreen() {
  const [val, setVal] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [msgs, setMsgs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id =
      user.uid > route.params.uid
        ? `${user.uid + route.params.uid}`
        : `${route.params.uid + user.uid}`;

    await addDoc(collection(db, 'messages', id, 'chat'), {
      val,
      from: user.uid,
      to: route.params.uid,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const getMessages = async () => {
    const id =
      user.uid > route.params.uid
        ? `${user.uid + route.params.uid}`
        : `${route.params.uid + user.uid}`;
    const msgsRef = collection(db, 'messages', id, 'chat');
    const q = query(msgsRef, orderBy('createdAt', 'asc'));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
    return () => unsub();
  };

  useEffect(async () => {
    const id =
      user.uid > route.params.uid
        ? `${user.uid + route.params.uid}`
        : `${route.params.uid + user.uid}`;
    const msgsRef = collection(db, 'messages', id, 'chat');
    const q = query(msgsRef, orderBy('createdAt', 'asc'));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      console.log(querySnapshot.docs);
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
  }, []);

  const send = async (e) => {
    e.preventDefault();

    if (val.length <= 255) {
      const id =
        user.uid > route.params.uid
          ? `${user.uid + route.params.uid}`
          : `${route.params.uid + user.uid}`;

      await addDoc(collection(db, 'messages', id, 'chat'), {
        val,
        from: user.uid,
        to: route.params.uid,
        createdAt: Timestamp.fromDate(new Date()),
      });
      Alert.alert('Success', 'Message sent', [
        {
          text: 'OKAY',
          onPress: () => console.log('Okay pressed'),
        },
      ]);
    } else {
      Alert.alert('Failed', 'Message Too Long', [
        {
          text: 'OKAY',
          onPress: () => console.log('Okay pressed'),
        },
      ]);
    }
  };

  return (
    <>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.buttonOtherContainer}>
          <TouchableOpacity style={[styles.buttonOther]}>
            <Text style={[styles.buttonText, { fontSize: 25 }]}>
              {route.params.name}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonOther, { borderColor: 'black' }]}
            onPress={() => {
              navigation.replace('Home');
            }}
          >
            <Text style={styles.buttonText}>X</Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.chatcontainer}>
          <ScrollView>
            {msgs.map((message) => (
              <Text
                style={
                  message.from == user.uid
                    ? styles.mytextcontainer
                    : styles.othertextcontainer
                }
                key={message.createdAt}
              >
                {message.val}
              </Text>
            ))}

            
          </ScrollView>
        </SafeAreaView>
        <View style={styles.inputcontainer}>
          <TextInput
            mode="outlined"
            placeholder="Message Here..."
            style={styles.input}
            value={val}
            onChangeText={(text) => {
              setVal(text);
            }}
            right={
              <TextInput.Affix text={'/' + (300 - val.length)} />
            }
          />
          <Button
            mode="outlined"
            style={{ padding: 10 }}
            onPress={send}
          >
            <Text style={{ color: 'black' }}>Send</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatcontainer: {
    flex: 1,
    marginTop: 100,
    width: '95%',
    padding: 10,
    zIndex: -1,
    marginBottom: 75,
  },
  mytextcontainer: {
    padding: 10,
    borderWidth: 1,
    textAlign: 'right',
    width: '40%',
    alignSelf: 'flex-end',
    borderRadius: 5,
    backgroundColor: '#83ff70',
    marginVertical: 5,
  },
  othertextcontainer: {
    textAlign: 'left',
    padding: 10,
    borderWidth: 1,
    width: '40%',
    borderRadius: 5,
    backgroundColor: '#6087fc',
    marginVertical: 5,
  },
  inputcontainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
    width: '100%',
    zIndex: 3,
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  input: {
    width: '70%',
    margin: 5,
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOtherContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 50,
  },
  buttonOther: {
    marginHorizontal: 110,
  },
});
