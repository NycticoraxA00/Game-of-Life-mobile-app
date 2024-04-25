import { View,Text,TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import { COLOR } from "../../util/color";

const Activity = ({icon, name, benefit, energy,onPress,readOnly,isNavigate})=>{
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
                    <Text style={styles.payrate}>{energy} energy/week</Text>
                    <Text style={styles.cost}>benefit{benefit}</Text>
                </View>
            </View>
            {isNavigate && (
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
        minHeight:'7%'
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
        minWidth:180,
    },
    cost:{

    }
}
export default Activity;