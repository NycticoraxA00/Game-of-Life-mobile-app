import { View, Text, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { COLOR } from "../../util/color";
import UserForm from "../Authentication/UserForm";
import {createUser} from "../../util/auth";
import { useContext, useState } from "react";
import LoadingOverlay from "../UI/LoadingOverlay";
import { AuthContext } from "../../store/auth-context";

const SignupScreen =({navigation})=>{
    const [isAuthenticating, setIsAuthenticating]=useState(false);
    const authCtx = useContext(AuthContext);
    const toLoginScreen=()=>{
        navigation.replace('Login')
    }
    const dismissKeyboard=()=>{
        Keyboard.dismiss();
    }
    const signUpHandler = async({email, password})=>{

        setIsAuthenticating(true);
        try {
            const token = await createUser(email, password);
            authCtx.authenticate(token);
            console.log("Sign up email: "+email+", password: "+ password);
            console.log("isAuthenticated in SignUp handler:"+authCtx.isAuthenticated);
            console.log("........")
          } catch (error) {
            Alert.alert(
                error,
                'Authentication failed',
                'Could not create user, please check your input and try again later.'
            );
          }
        setIsAuthenticating(false);
    }
    if (isAuthenticating){
        return <LoadingOverlay message="Creating new character..."/>
    }
    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <KeyboardAvoidingView behavior="position">
        <View style={styles.container}>
            
            <Text style={styles.title}>Welcome New Player</Text>
            <View style={styles.form}>
                <UserForm onAuthenticate={signUpHandler}/>
            </View>
            <TouchableOpacity onPress = {toLoginScreen}>
                <Text style={styles.switch}>Log in</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}
const styles={
    container:{
        alignItems:'center',
    },
    title:{
        fontWeight:500,
        fontSize:24,
        marginTop:100,
        marginBottom:40,
    },
    switch:{
        fontSize:17,
        paddingVertical:12,
        paddingHorizontal:23,
        color:COLOR.blue,
        minWidth:'60%',
        textAlign:'center',
        borderWidth:2,
        borderColor:COLOR.blue,
        borderRadius:5,
        margin:5
    }
}
export default SignupScreen;