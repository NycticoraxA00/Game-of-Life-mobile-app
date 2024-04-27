import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLOR } from "../../../util/color";
import IconButton from "../../../components/UI/IconButton";
import Button from "../../../components/UI/Button";
import { useContext } from "react";
import { StatContext } from "../../../store/stat-context";
import { LogContext } from "../../../store/log-context";
import Activity from "../../../components/ActivityScreen/Activity";

const CurrentActOptions =({route})=>{
    const navigation = useNavigation();
    const {actType} = route.params;
    const statCtx = useContext(StatContext);
    const logCtx = useContext(LogContext);
    const currentAct = statCtx.getActByActType(actType);
    const quitAct = ()=>{
        statCtx.adjustEnergy(
            statCtx.energy 
            + currentAct.cost);
        statCtx.quitAct(actType);
        logCtx.detectAction('You quit your current '+actType+' Activity');
        navigation.goBack();
    }
    const goBack = () => {
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.name}>Current {actType} Activity</Text>
            <Activity 
                icon={currentAct.actIcon}
                name={currentAct.actName}
                behavior={currentAct.behavior}
                energy={currentAct.cost}
                actType={currentAct.actType}/>
            <Text style={styles.subText}>Current Activity Options</Text>
        </View>
        <View style={styles.body}>
            <Button 
                name={"Quit"}
                onPress={quitAct} />
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
        justifyContent:'center',
        alignItems:'center',
    },
    name:{
        marginTop:50,
        fontSize:24,
        borderRadius:25,
        minWidth:'80%',
        textAlign:'center',
        minHeight:50,
        padding:10,
        marginBottom:20,
    },
    subText:{
        marginVertical:30,
        marginHorizontal:20,
        textAlign:'center',
        fontSize:24,
        borderTopWidth:1,
        minWidth:'80%',
        paddingTop:20,
    },
    footer:{
        alignItems:'center',
        justifyContent:'center',
    }

}
export default CurrentActOptions;