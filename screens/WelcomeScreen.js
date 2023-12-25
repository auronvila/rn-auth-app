import {Button, StyleSheet, Text, View} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../store/auth-context';
import axios from 'axios';

function WelcomeScreen() {
  const {logOut, token} = useContext(AuthContext)
  const [fetchedMessage, setFetchedMessage] = useState('')

  useEffect(() => {
    axios.get('https://auth-project-c55c0-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=' + token)
      .then(res => {
        setFetchedMessage(res.data)
      })
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Button onPress={logOut} title={'LogOut'}/>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
