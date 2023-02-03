import React from 'react';
import {
  Text,
  View,
  Button,
} from 'react-native';
import { singOut } from '../services/AuthServices';

export default function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
            onPress={() => singOut()}
            title="LogOut"
            color="#841584"
            accessibilityLabel="logOut"
            />
        </View>
    );
}

