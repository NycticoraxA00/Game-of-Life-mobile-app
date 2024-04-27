import { View,Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import { COLOR } from "../../util/color";

const Job = ({
    icon,
    name,
    payrate,
    energy,
    onPress,
    readOnly,
    isNavigate,
    isUnemployed,
    isUnavailable
  }) => {
    if (isUnemployed) {
      return (
        <View style={styles.containerA}>
          <Text style={styles.text}>You haven't applied for a job yet</Text>
        </View>
      );
    } else {
      const containerStyle = isUnavailable ? { ...styles.container, borderColor: COLOR.darkRed } : styles.container;
      const activeOpacity = (readOnly || isUnavailable) ? 1 : 0.2;
  
      return (
        <TouchableOpacity
          activeOpacity={activeOpacity}
          style={containerStyle}
          onPress={!isUnavailable?onPress:null}
        >
          <View style={styles.iconContainer}>
            <Icon style={styles.icon} name={icon} size={30} color={COLOR.black} />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.description}>
              <Text style={styles.payrate}>{payrate} $/week</Text>
              <Text style={styles.cost}>{energy} energy/week</Text>
            </View>
          </View>
          {isNavigate && (
            <View style={styles.iconContainer}>
              <Icon style={styles.icon} name="angle-right" size={30} color={COLOR.black} />
            </View>
          )}
        </TouchableOpacity>
      );
    }
  }; 
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
    payrate:{
        minWidth:110,
    },
    cost:{
        width:110,
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
export default Job;