import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, Text, View, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer} from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { COLOR } from './util/color';
import IconButton from './components/UI/IconButton';
import AppLoading from 'expo-app-loading';

import MainScreen from './screens/MainScreen';
import EducationScreen from './screens/EducationScreen';
import JobScreen from './screens/JobScreen';
import ActivityScreen from './screens/ActivityScreen';
import SettingScreen from './screens/sub-screens/SettingScreen';
import AuthenticationScreen from './screens/AuthenticationScreen';
import { useContext, useState, useEffect } from 'react';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StatContextProvider from './store/stat-context';
import AppContextProvider from './store/AppContext';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const tabBarStyles={
  tabBarIconStyle: { display: "none" },
  tabBarLabelStyle:{
    fontSize:18,
    fontWeight:'bold',
    marginBottom:17,
  },
}
const AppOverview=()=>{
  return (
    <BottomTab.Navigator
      screenOptions={({navigation})=> ({
        headerStyle:{backgroundColor:COLOR.black},
        headerTintColor:COLOR.white,
        tabBarStyle:{
          height: 60,
          backgroundColor:COLOR.grey,},
        tabBarActiveTintColor:COLOR.blue,
        tabBarInactiveTintColor:COLOR.black,
        headerRight: ({tintColor})=>{
          return(
            <IconButton 
              icon = "gear" size ={24} color = {tintColor}
              onPress={()=>{navigation.navigate('Setting Screen')}}/>
          )
        },
      })}>
      <BottomTab.Screen 
        name="Main"
        component={MainScreen}
        options={{
          tabBarLabel:'Home',
          ...tabBarStyles
        }}/>
      <BottomTab.Screen 
        name="Education Screen"
        component={EducationScreen}
        options={{
          title:'Education Screen',
          tabBarLabel:'Education',
          ...tabBarStyles
        }}/>
      <BottomTab.Screen 
        name="Job Screen"
        component={JobScreen}
        options={{
          title:'Job Screen',
          tabBarLabel:'Job',
          ...tabBarStyles
        }}/>
      <BottomTab.Screen
        name='Activity Screen'
        component={ActivityScreen}
        options={{
          title:'Activity Screen',
          tabBarLabel:'Activity',
          ...tabBarStyles
        }}/>
    </BottomTab.Navigator>)
}
const PlayView=()=>{
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
      }}>
        <Stack.Screen
          name ="App Overview"
          component={AppOverview}
          options={{
            title:'Have fun ( ͡° ͜ʖ ͡° )',
          }}
        />
        <Stack.Screen
          name="Setting Screen"
          component={SettingScreen}
          options={{}}/>
    </Stack.Navigator>
  )
}
const AuthenticationView=()=>{
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:true,
        headerStyle:{backgroundColor:COLOR.black},
        headerTitleAlign:'center',
        headerTintColor:COLOR.white,
      }}>
        <Stack.Screen
              name ="App Authentication"
              component={AuthenticationScreen}
              options={{
                title:'Authentication',
              }}
            />
      </Stack.Navigator>
  )
}
const Navigation = ()=>{
  const authCtx = useContext(AuthContext);
  return(
    <NavigationContainer>
        <StatusBar style = 'light'/>
        {/* {!authCtx.isAuthenticated && <AuthenticationView/>}
        {authCtx.isAuthenticated && <PlayView/>} */}
        <PlayView/>
    </NavigationContainer>
  )
}
const Root = ()=>{
  const [isLoginAgain, setIsLoginAgain] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(()=>{
    async function fetchToken(){
        const storedToken = await AsyncStorage.getItem('token');
        if(storedToken) {
            authCtx.authenticate(storedToken);
        } else {
            // Alert.alert("No stored token found")
        }
        setIsLoginAgain(false);
    }
    fetchToken();
  },[]);
  if(isLoginAgain){
    console.log(isLoginAgain);
    return <AppLoading/>
  }
  return <Navigation/>
}

export default function App() {
  
  return (
    <AppContextProvider>
      <Root/>
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
