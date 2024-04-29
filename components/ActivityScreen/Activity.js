import { View,Text,TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import { COLOR } from "../../util/color";
import { useContext } from "react";
import { StatContext } from "../../store/stat-context";

const Activity = ({
    icon, 
    name, 
    behavior, 
    energy, 
    actType, 
    onPress,
    readOnly,
    isNavigate, 
    isInactivity
})=>{
    const statCtx = useContext(StatContext);
    let behaviorText;
    if (actType === 'Exercise') {
        behaviorText = '+' + behavior +' health';
    } else if (actType === 'Socialize') {
        behaviorText = '+ ' + behavior +' charm';
    } else if (actType === 'Skill') {
        behaviorText = behavior +' weeks';
    } 
     if (isInactivity){
        return (
            <View style={styles.containerA}>
                <Text style={styles.text}>You haven't join an activity yet</Text>
            </View>
        )
    } else {
        return(
            <TouchableOpacity 
                activeOpacity={readOnly?1:0.2}
                style={styles.container} 
                onPress={onPress}
            >
                <View style={styles.iconContainer}>
                    <Icon style={styles.icon} name={icon} size={30} color={COLOR.black}/>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.description}>
                    <Text style={styles.behavior}>
                        {behaviorText}</Text>
                    <Text style={styles.cost}>{energy} energy/week</Text>
                    </View>
                </View>
                {isNavigate && (
                    <View style={styles.iconContainer}>
                        <Icon style={styles.icon} name="angle-right" size={30} color={COLOR.black}/>
                    </View>
                )}
            </TouchableOpacity>
    )}
}   
const styles={
    container:{
        flexDirection:'row',
        borderWidth:2,
        borderColor:COLOR.black,
        borderRadius:20,
        minWidth:'80%',
        minHeight:'7%',
    },
    iconContainer:{
        minWidth:50,
        justifyContent:'center',
        alignItems:'center'
    },
    descriptionContainer:{
        justifyContent:'center'
    },
    name:{
        fontSize:18,
    },
    description:{
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    behavior:{
        minWidth:'30%',
    },
    cost:{
        
    },
    containerA:{
        flexDirection:'row',
        borderWidth:2,
        borderColor:COLOR.darkGrey,
        borderRadius:20,
        minWidth:'80%',
        minHeight:'7%',
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontSize:17,
        color:COLOR.darkGrey,
    }
}
export default Activity;