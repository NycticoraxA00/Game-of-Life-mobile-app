import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLOR } from "../../../util/color";
import IconButton from "../../../components/UI/IconButton";
import Button from "../../../components/UI/Button";
import Job from "../../../components/JobScreen/Job";
import JobOptions from "./JobOptions";

const CurrentJobOptions =({route})=>{
    const navigation = useNavigation();
    const {jobType} = route.params;
    const goBack = () => {
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.name}>Current {jobType} Job</Text>
            <Job 
                name={"React Native Developer"}
                icon={"mobile-phone"}
                payrate={1800}
                energy={40}
                readOnly={true}/>
            <Text style={styles.subText}>Current Job Options</Text>
        </View>
        <View style={styles.body}>
            <JobOptions 
                icon="flash" name="Overtime" payrate="2000" energy="45"
                // onPress
                readOnly={true}/>
            <JobOptions 
                icon="dollar" name="Ask for a raise" payrate="2000" energy="40"
                // onPress
                readOnly={true}/>
            <Button name={"Quit"}/>
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
    availableEnergyContainer:{
        // backgroundColor:COLOR.white,
        borderRadius:20,
        minWidth:'60%',
        flexDirection:'row',
    },
    availableEnergy:{
        minWidth:'52%',
    },
    availableEnergyAmount:{
        textAlign:'center',
        color:COLOR.blue,
        fontWeight:'bold',
        fontSize:15
    },
    subText:{
        marginVertical:30,
        marginHorizontal:20,
        textAlign:'center',
        fontSize:24,
        borderTopWidth:1,
        minWidth:'80%',
        paddingTop:20,
        
        // backgroundColor:COLOR.black,
    },
    footer:{
        alignItems:'center',
        justifyContent:'center',

    }

}
export default CurrentJobOptions;