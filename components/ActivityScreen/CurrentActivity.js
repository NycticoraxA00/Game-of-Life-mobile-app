import { View, Text } from "react-native";
import Activity from "./Activity";
import { useContext } from "react";
import { StatContext } from "../../store/stat-context";
import { COLOR } from "../../util/color";

const CurrentActivity=({actType, onPress})=>{
    const statCtx = useContext(StatContext);
    let isInactivity=true;

    const currentAct = statCtx.getActByActType(actType);
    if (currentAct !== '') {
        isInactivity = false;
    }
    return(
        <View style={styles.container}>
            <Text style={styles.label}>
                {actType=='Skill'?'Current Learning Skill':'Current '+actType }
            </Text>
            <Activity 
                icon={currentAct.actIcon}
                name={currentAct.actName}
                behavior={currentAct.behavior}
                energy={currentAct.cost}
                actType={currentAct.actType}
                onPress={onPress} 
                isNavigate 
                isInactivity={isInactivity}/>
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
export default CurrentActivity;