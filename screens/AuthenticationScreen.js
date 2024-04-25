import {View, Text, Touchable, TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import { COLOR } from '../util/color';
import {useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Button from '../components/UI/Button';
import LoginScreen from '../components/AuthenticationScreen/LoginScreen';
import SignupScreen from '../components/AuthenticationScreen/SignupScreen';
import { useState } from 'react';
import Input from '../components/AuthenticationScreen/Input';


const Stack = createNativeStackNavigator();
const AuthenticationScreen = ()=>{
    return (
      <View style={styles.container}>
          <Stack.Navigator >
              <Stack.Screen 
                name="Login"
                component={LoginScreen}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name="Sign Up"
                component={SignupScreen}
                options={{ headerShown: false }}
              />
          </Stack.Navigator>
      </View>
         
    );
}
const styles={
    container:{
        flex:1,
        backgroundColor:COLOR.grey
    },
}
export default AuthenticationScreen;