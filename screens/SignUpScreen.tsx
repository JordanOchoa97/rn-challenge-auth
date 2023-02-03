import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { emailSignUp, googleSignIn, phoneNumberSignIn } from '../services/AuthServices';

export default function SignUpScreen({navigation}) {
    const [user, setUser] = useState();
    const [email, setEmail] = useState<any>("");
    const [password, setPassword] = useState<any>("");

    function onAuthStateChanged(user: any) {
      setUser(user);
    }
    if(user) navigation.navigate("Home")
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Create</Text>
            <TextInput value={email} onChangeText={text => setEmail(text)} style={styles.input}/>
            <TextInput value={password} onChangeText={text => setPassword(text)} style={styles.input} secureTextEntry/>
        <Button
          onPress={() => {
            console.log("Create with email and password")
            emailSignUp(email, password)
          }}
          title="Create User"
          color="#841584"
          accessibilityLabel="Login with email and password"
        />
        
      </View>
    );
  }

const styles = StyleSheet.create({
    input: {
        width: "70%",
        backgroundColor: '#ccc',
        height: 40,
        marginTop: 10
    }
});