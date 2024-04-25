import { View, Text, Touchable, TouchableOpacity } from "react-native";
import { COLOR } from "../../util/color";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import { useContext } from "react";
import { SubjectContext } from "../../store/subject-context";

const Subject = ({name, energy, credits,isActive, onPress})=>{
    const subjectCtx = useContext(SubjectContext);
    const subjectEnergy = subjectCtx.getSubjectEnergy(energy);
    return(
        <TouchableOpacity onPress={onPress} disabled={!isActive}>
            {isActive ? (
            <View style={styles.container}>
                <Text style={styles.subject}>{name}</Text>
                <Text style ={styles.credit}>{credits} credits</Text>
                <Text style ={styles.energy}>{subjectEnergy} energy/week</Text>
                <View style={styles.iconContainer}>
                    <Icon style={styles.icon} name="angle-right" size={25} color={COLOR.black}/>
                </View>
            </View>
                  ) : (
            <View style={styles.container}>
                <Text style={styles.subjectA}>{name}</Text>
                <Text style ={styles.creditA}>{credits} credits</Text>
            </View>)}
        </TouchableOpacity>
    )
}

const styles={
    container:{
        borderWidth:2,
        borderColor:COLOR.black,
        height:50,
        borderRadius:20,
        alignItems:'center',
        // justifyContent:'center',
        marginBottom:20,
        flexDirection:'row',
    },
    subject:{
        marginLeft:'5%',
        fontSize:18,
        minWidth:'27%',
    },
    energy:{
        fontSize:15,
        width:110,
    },
    credit:{
        fontSize:18,
        color:COLOR.blue,
        fontWeight:'bold',
        width:100,
    },
    subjectA:{
        marginLeft:'5%',
        fontSize:18,
        minWidth:'65%',
    },
    creditA:{
        fontSize:18,
        color:COLOR.blue,
        fontWeight:'bold',
        minWidth:120,
    },
    iconContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
}
export default Subject;