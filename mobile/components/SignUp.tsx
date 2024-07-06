import { TextInput, Pressable, StyleSheet, ToastAndroid } from 'react-native';

import { Text, View } from '@/components/Themed';
import React, { useState, useContext } from 'react';
import AppContext from "./AppContext";

import Account from './Account';

export default function LaiveAccount() {  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const context = useContext(AppContext);

  const doesHaveAccount = () => {
    const endpoint2 = "https://zeta-labs-backend-5ba732d1aabf.herokuapp.com/create_user";
    if (password.length < 10) {
      ToastAndroid.show("Password must be at least 10 characters long", ToastAndroid.SHORT);
      return;
    }
    fetch(endpoint2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: email, password: password }),
    })
    context.setIsSignedIn(true);
    context.setPassword(password);
    context.setEmail(email);
  }

  const signOut = () => {
    context.setIsSignedIn(false)
    context.setPassword("");
    context.setEmail("");
  }

  return (
    <View>
      <View style={{ backgroundColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.signInTitle}>Join Laive</Text>
        <TextInput style={styles.input} placeholder="Email" ref={input => { var text = input }} onChangeText={text => setEmail(text)} value={email}/>
        <TextInput style={styles.input} placeholder="Password" ref={input => { var text = input }} onChangeText={text => setPassword(text)} value={password}/>
        <Pressable style={styles.signUpButton} onPress={doesHaveAccount}>
          <Text style={{ color: "#fff" }}>Sign Up</Text>
        </Pressable>
        {/* <Pressable style={{ marginTop: 20, padding: 20 }}>
          <Text style={{ color: "#fff" }}>Click here if you already have an account.</Text>
        </Pressable> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR,
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  signInTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    backgroundColor: "#fff",
    color: process.env.EXPO_PUBLIC_TERTIARY_COLOR,
    height: 45,
    width: 250,
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 10,
  },
  signUpButton: {
    // backgroundColor: process.env.EXPO_PUBLIC_SECONDARY_COLOR,
    height: 45,
    width: 250,
    borderRadius: 20,
    backgroundColor: '#64B5F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutButton: {
    // backgroundColor: process.env.EXPO_PUBLIC_SECONDARY_COLOR,
    height: 45,
    width: 250,
    borderRadius: 20,
    backgroundColor: '#64B5F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
