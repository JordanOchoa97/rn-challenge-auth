import React, { useState } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';

export default function PhoneLogin({route}) {
    //const {confirm} = route.params
    const [code, setCode] = useState<any>("");
    async function confirmCode() {
        try {
          await confirm.confirm(code);
        } catch (error) {
          console.log('Invalid code.');
        }
      }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TextInput value={code} onChangeText={text => setCode(text)} style={{width: "70%", backgroundColor: '#ccc', height: 40}}/>
            <Button title="Confirm Code" onPress={() => confirmCode()} />
        </View>
    );
}