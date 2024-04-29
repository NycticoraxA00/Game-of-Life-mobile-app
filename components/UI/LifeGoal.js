import { View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import { COLOR } from '../../util/color';

const LifeGoals = ({name,icon })=>{
    return(
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.textContainer}>
                    <Text style={styles.buttonText}>{name}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Icon style={styles.icon} name={icon} size={20} color={COLOR.black}/>
                </View>
            </View>
        </View>
    )
}
const styles={
    container:{
        margin:12,
    },
    content:{
        flexDirection:'row',
        borderRadius:20, 
        padding: 15,
        borderWidth:2,
        borderColor:COLOR.black,
        justifyContent:'center'
    },
    textContainer:{
        minWidth:'80%',
    },
    buttonText:{
        textAlign:'center',
        fontSize:20,
    },
    iconContainer:{
        justifyContent:'center'
    },
}
export default LifeGoals;