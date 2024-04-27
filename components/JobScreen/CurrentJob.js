import { View, Text } from "react-native"
import Job from "./Job";
import { useContext } from "react";
import { StatContext } from "../../store/stat-context";
import { JOB_INFO } from "../../data/job-data";
import { COLOR } from "../../util/color";

const CurrentJob=({jobType,onPress})=>{
    const statCtx = useContext(StatContext);
    let isUnemployed=true;

    const currentJob = statCtx.getJobByJobType(jobType);
    if (currentJob !== '') {
        isUnemployed = false;
    }
    return(
        <View style={styles.container}>
            <Text style={styles.label}>
                Current {jobType} Job
            </Text>
            <Job 
                icon={currentJob.jobIcon}
                name={currentJob.jobName}
                payrate={currentJob.salary}
                energy={currentJob.cost}
                onPress={onPress} 
                isNavigate 
                isUnemployed={isUnemployed}/>
        </View>
    )
}
const styles={
    container:{
        alignItems:'center',
        justifyContent:'center',

    },
    label:{
        fontSize:24,
        padding:10,
    }
}
export default CurrentJob;