import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import PhoneLogin from './screens/PhoneLogin';
import SignUpScreen from './screens/SignUpScreen';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);
  
  console.log(user)

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  
  initializing ? console.log("initializing") : console.log("not initializing")

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          user == null ? <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="PhoneLogin" component={PhoneLogin} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
           : <Stack.Screen name="Home" component={HomeScreen} />
        }
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
