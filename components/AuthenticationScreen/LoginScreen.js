import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard, Alert } from "react-native";
import { COLOR } from "../../util/color";
import avatarImage from '../../assets/Donut.png';
import Button from "../UI/Button";
import {useNavigation} from '@react-navigation/native';
import UserForm from "../Authentication/UserForm";
import { TouchableWithoutFeedback } from "react-native";
import { useContext, useState } from "react";
import LoadingOverlay from "../UI/LoadingOverlay";
import { login } from "../../util/auth";
import { AuthContext } from "../../store/auth-context";

const LoginScreen =({navigation})=>{
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    
    const authCtx = useContext(AuthContext);
    
    const toSignupScreen=()=>{
        navigation.replace('Sign Up')
    }
    const dismissKeyboard=()=>{
        Keyboard.dismiss();
    }
    const loginHandler = async ({email,password})=>{
        setIsAuthenticating(true);
        try {
            const token = await login(email, password);
            authCtx.authenticate(token);
            console.log("Login email: "+email+", password: "+ password);
            console.log("isAuthenticated in Login handler:"+authCtx.isAuthenticated);
            console.log("........")
        } catch (error) {
            Alert.alert(
                error,
                'Authentication failed!',
                'Could not log you in. Please check your credentials or try again later!'
            );
            setIsAuthenticating(false);
        }
        
    }
    if (isAuthenticating) {
        return <LoadingOverlay message="Logging you in..." />;
    }
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <KeyboardAvoidingView behavior="position">
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Welcome to I am a Developer</Text>

                    <Image 
                        style={styles.image}
                        source={avatarImage} alt='User Avatar'
                    />
                    <UserForm isLogin={true} onAuthenticate={loginHandler}/>
                    <TouchableOpacity onPress = {toSignupScreen}>
                        <Text style={styles.switch}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        </View>  
    )
}
const styles={ 
    container:{
        flex:1,
        backgroundColor:COLOR.grey
    },
    innerContainer:{
        alignItems:'center',
    },
    title:{
        fontWeight:500,
        fontSize:24,
        marginTop:100,
        marginBottom:40,
    },
    image:{
        width: 180,
        height: 180,
        borderRadius: 100,
        marginBottom:20,
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
export default LoginScreen;