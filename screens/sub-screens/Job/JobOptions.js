import { View,Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import { COLOR } from "../../../util/color";

const JobOptions = ({icon,name,payrate,energy,onPress,readOnly})=>{
    return(
        <TouchableOpacity 
            style={styles.container} 
            onPress={onPress}
        >
            <View style={styles.iconContainer}>
                <Icon style={styles.icon} name={icon} size={30} color={COLOR.black}/>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.description}>
                    <Text style={styles.payrate}>{payrate} $/week</Text>
                    <Text style={styles.cost}>{energy} energy/week</Text>
                </View>
            </View>
            {!readOnly && (
                <View style={styles.iconContainer}>
                    <Icon style={styles.icon} name="angle-right" size={30} color={COLOR.black}/>
                </View>
            )}
        </TouchableOpacity>
    )
}   
const styles={
    container:{
        flexDirection:'row',
        borderWidth:2,
        borderColor:COLOR.black,
        borderRadius:20,
        minWidth:'80%',
        minHeight:'7%',
        marginBottom:30,
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
    payrate:{
        minWidth:110,
    },
    cost:{
        width:110,
    }
}
export default JobOptions;