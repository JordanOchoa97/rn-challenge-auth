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
import { emailSignIn, googleSignIn, phoneNumberSignIn } from '../services/AuthServices';

export default function LoginScreen({navigation}) {
    const [confirm, setConfirm] = useState<any | null>(null);
    const [code, setCode] = useState<any>("");

    const [email, setEmail] = useState<any>("");
    const [password, setPassword] = useState<any>("");
  
    async function signInWithPhoneNumber(phoneNumber: string) {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    }
    async function confirmCode() {
      try {
        await confirm.confirm(code);
      } catch (error) {
        console.log('Invalid code.');
      }
    }
    
    //confirm ? navigation.navigate("PhoneLogin", confirm) : null

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login</Text>
            <TextInput value={email} onChangeText={text => setEmail(text)} style={styles.input}/>
            <TextInput value={password} onChangeText={text => setPassword(text)} style={styles.input} secureTextEntry/>
        <Button
          onPress={() => {
            console.log("Login with email and password")
            emailSignIn(email, password)
          }}
          title="Login with email and password"
          color="#841584"
          accessibilityLabel="Login with email and password"
        />
        <View style={{flexDirection: "row"}}>
            <TouchableOpacity
                onPress={() => googleSignIn().then(() => console.log('Signed in with Google!'))}
            >
                <Image
                    style={{height: 35, width: 35}}
                    source={require('../assets/icons/googleIcon.jpg')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => signInWithPhoneNumber('+52 313-962-5960')}
            >
                <Image
                    style={{height: 35, width: 35}}
                    source={require('../assets/icons/phoneIcon.jpg')}
                />
            </TouchableOpacity>
        </View>
        <Button
          onPress={() => {
            console.log("Login with email and password")
            navigation.navigate("SignUp")
          }}
          title="Create user with email and password"
          color="#841584"
          accessibilityLabel="SignUp with email and password"
        />
        {
            confirm ? <>
                <TextInput value={code} onChangeText={text => setCode(text)} style={styles.input}/>
                <Button
                    onPress={() => {
                        console.log("Login with email and password")
                        confirmCode()
                    }}
                    title="Confirm code"
                    color="#841584"
                    accessibilityLabel="SignUp with email and password"
                    />
            </> : null
        }
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