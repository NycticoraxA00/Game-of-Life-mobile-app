import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLOR } from "../../../util/color";
import IconButton from "../../../components/UI/IconButton";
import Button from "../../../components/UI/Button";
import Job from "../../../components/JobScreen/Job";
import JobOptions from "./JobOptions";
import { useContext } from "react";
import { StatContext } from "../../../store/stat-context";
import { LogContext } from "../../../store/log-context";

const CurrentJobOptions =({route})=>{
    const navigation = useNavigation();
    const {jobType} = route.params;
    const statCtx = useContext(StatContext);
    const logCtx = useContext(LogContext);
    const currentJob = statCtx.getJobByJobType(jobType);
    const quitJob = ()=>{
        statCtx.adjustEnergy(
            statCtx.energy 
            + currentJob.cost);
        statCtx.quitJob(jobType);
        logCtx.detectAction('You quit your current '+jobType+' Job');
        
        navigation.goBack();
    }
    const goBack = () => {
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.name}>Current {jobType} Job</Text>
            <Job 
                icon={currentJob.jobIcon}
                name={currentJob.jobName}
                payrate={currentJob.salary}
                energy={currentJob.cost}
                readOnly={true}/>
            <Text style={styles.subText}>Options</Text>
        </View>
        <View style={styles.body}>
            <JobOptions 
                icon="flash" 
                name="implemet overtime..." 
                payrate={currentJob.salary + 5/currentJob.cost*currentJob.salary} 
                energy={currentJob.cost+5}
                // onPress
                readOnly/>
            <JobOptions 
                icon="dollar" 
                name="implemet ask for a raise..." 
                payrate={currentJob.salary + 5/currentJob.cost*currentJob.salary} 
                energy={currentJob.cost}
                // onPress
                readOnly/>
            <Button 
                name={"Quit"}
                onPress={quitJob} />
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