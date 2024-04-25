import { View,Text,TouchableOpacity, Alert } from "react-native";
import { COLOR } from "../../util/color";
import Input from "../AuthenticationScreen/Input";
import { useState } from "react";

const UserForm = ({isLogin, onAuthenticate})=>{
    const [enteredEmail, setEnteredEmail]=useState('');
    const [enteredConfirmEmail, setEnteredConfirmEmail]=useState('');
    const [enteredPassword, setEnteredPassword]=useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword]=useState('');
    
    const [credentialsInvalid, setCredentialsInvalid] = useState({
        email: false, 
        password: false,
        confirmEmail: false,
        confirmPassword: false,
    })
    const onSubmit =(credentials)=>{
        let {email,confirmEmail, password, confirmPassword} = credentials;
        email = email.trim();
        password = password.trim();

        const emailIsValid = email.includes('@');
        const passwordIsValid = password.length >= 6;
        const emailsAreEqual = email === confirmEmail;
        const passwordAreEqual = password === confirmPassword;

        if(!emailIsValid || !passwordIsValid || 
            (!isLogin && (!emailsAreEqual || !passwordAreEqual))){
                Alert.alert('Invalid input')
                setCredentialsInvalid({
                    email: !emailIsValid,
                    confirmEmail: !emailIsValid || !emailsAreEqual,
                    password: !passwordIsValid,
                    confirmPassword: !passwordIsValid || !passwordAreEqual,
                });
                return;
            }
            onAuthenticate({email, password});
            console.log("Authenticate email:"+email+", password:"+ password)
            
    }
    const submitHandler =()=>{
        onSubmit({
            email:enteredEmail,
            confirmEmail:enteredConfirmEmail,
            password:enteredPassword,
            confirmPassword:enteredConfirmPassword,
        })
        console.log("Submit email:"+enteredEmail+", password"+ enteredPassword)
    }

    const updateInputValue = (inputType, enteredValue)=>{
        switch (inputType){
            case 'email':
                setEnteredEmail(enteredValue);
                break;
            case 'confirmEmail':
                setEnteredConfirmEmail(enteredValue);
                break;
            case 'password':
                setEnteredPassword(enteredValue);
                break;
            case 'confirmPassword':
                setEnteredConfirmPassword(enteredValue);
                break;
        }
    }

    
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Input
                    label = "Email Address"
                    onUpdateValue={updateInputValue.bind(this,'email')}
                    value={enteredEmail}
                    keyboardType="email-address"
                    isInvalid={""}/>
                {!isLogin && (    
                <Input
                    label = "Confirm Email Address"
                    onUpdateValue={updateInputValue.bind(this,'confirmEmail')}
                    value={enteredConfirmEmail}
                    keyboardType="email-address"
                    isInvalid={""}/>)}
                <Input
                    label = "Password"
                    onUpdateValue={updateInputValue.bind(this,'password')}
                    value={enteredPassword}
                    secure/>
                {!isLogin && (    
                <Input
                    label = "Confirm Password"
                    onUpdateValue={updateInputValue.bind(this,'confirmPassword')}
                    value={enteredConfirmPassword}
                    secure
                    isInvalid={""}/>)}
            </View>
            <TouchableOpacity  onPress = {submitHandler}>
                <Text style={styles.login}>
                    {isLogin?'Log in':'Sign up'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles={
    container:{
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20,
    },
    formContainer:{
        marginBottom:20,
    },
    login:{
        fontSize:17,
        fontWeight:'bold',
        backgroundColor:COLOR.blue,
        color:COLOR.white,
        paddingVertical:12,
        paddingHorizontal:23,
        borderRadius:5,
        minWidth:'60%',
        textAlign:'center',
        margin:5
    },
}
export default UserForm;