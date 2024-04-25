import { View, Text,TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLOR } from "../../util/color";
import IconButton from "../../components/UI/IconButton";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import { StatContext } from "../../store/stat-context";
import { LogContext } from "../../store/log-context";
import { SubjectContext } from "../../store/subject-context";

const SettingScreen=()=>{
    const statCtx = useContext(StatContext);
    const logCtx = useContext(LogContext);
    const subjectCtx = useContext(SubjectContext);
    const navigation = useNavigation();
    const authCtx = useContext(AuthContext);
    const goBack = () => {
      navigation.goBack();
    }
    const resetGame = ()=>{
        statCtx.resetGame();
        logCtx.clearLogs();
        subjectCtx.resetGame();
        navigation.goBack();
    }
    return(
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.name}>Game Setting</Text>
        </View>
        <View style={styles.body}>
            <TouchableOpacity onPress={resetGame}>
                <Text style={styles.switch}>Restart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={authCtx.logout}>
                <Text style={styles.switch}>Log out</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.footer}>
            <IconButton 
                icon = "arrow-circle-left" size ={50} color = {COLOR.darkGrey}
                onPress={goBack}/>
        </View>
        </View>
    )
}
const styles={
    container:{

    },
    header:{
        alignItems:'center',
        justifyContent:'center'
    },
    body:{
        marginVertical:30,
        alignItems:'center',
        justifyContent:'center'
    },
    space:{
        height:30,
    },
    name:{
        marginTop:80,
        fontSize:24,
        borderBottomWidth:2,
        borderColor:COLOR.darkGrey,
        minWidth:'80%',
        textAlign:'center',
        minHeight:50,
        padding:10,
        marginBottom:20,
    },
    switch:{
        fontSize:17,
        paddingVertical:12,
        paddingHorizontal:23,
        color:COLOR.white,
        fontWeight:'bold',
        minWidth:'60%',
        textAlign:'center',
        backgroundColor:COLOR.darkGrey,
        borderRadius:5,
        margin:5
    },
    footer:{
        alignItems:'center',
        justifyContent:'center',

    }
}
export default SettingScreen;