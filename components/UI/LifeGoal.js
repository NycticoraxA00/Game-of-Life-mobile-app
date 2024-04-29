import { View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import { COLOR } from '../../util/color';
import { color } from 'react-native-elements/dist/helpers';

const LifeGoal = ({name,cost,achieved })=>{
    let icon;
    let color;
    if(achieved){
        icon ='star';
        color = COLOR.gold
    } else {
        icon = 'star-o'
        color = COLOR.black
    }
    return(
        <View style={styles.container}>
            <View style={achieved? styles.contentB: styles.contentA}>
                <View style={styles.iconContainer}>
                    <Icon style={styles.icon} name={icon} size={20} color={color}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={achieved? styles.textB:styles.textA}>{name}</Text>
                    <Text style={achieved? styles.subtextB:styles.subtextA}>Cost: {cost}</Text>
                </View>
                    
            </View>
        </View>
    )
}
const styles={
    container:{
        marginVertical:5,
    },
    contentA:{
        flexDirection:'row',
        borderRadius:20, 
        borderColor:COLOR.black,
        minWidth:'83%',
    },
    contentB:{
        flexDirection:'row',
        borderRadius:20, 
        borderColor:COLOR.black,
        minWidth:'83%',
    },
    iconContainer:{
        justifyContent:'center',
        marginRight:10,
    },
    textContainer:{
        
    },
    textB:{
        textAlign:'center',
        fontSize:20,
    },
    textA:{
        textAlign:'center',
        fontSize:20,
        color:COLOR.darkGrey
    },
    subtextB:{
        fontSize:14,
    },
    subtextA:{
        fontSize:14,
        color:COLOR.darkGrey
    },

}
export default LifeGoal;