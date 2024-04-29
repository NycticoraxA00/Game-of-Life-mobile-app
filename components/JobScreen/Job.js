import { View,Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import { COLOR } from "../../util/color";
import { color } from "react-native-elements/dist/helpers";

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
      let iconColor;
      let iconName;
      let nameStyle;
      if (isUnavailable){
        nameStyle=styles.nameU;
        iconName='star-o'
        // iconColor = COLOR.rose;
      } else {
        nameStyle=styles.nameA;
        iconName='star';
        // iconColor = COLOR.blue;
      }
      
      const activeOpacity = (readOnly || isUnavailable) ? 1 : 0.2;
  
      return (
        <TouchableOpacity
          activeOpacity={activeOpacity}
          style={styles.container}
          onPress={!isUnavailable?onPress:null}
        >
          <View style={styles.iconContainer}>
            <Icon style={styles.icon} name={iconName} size={30} color={iconColor} />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={nameStyle}>{name}</Text>
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
    nameA:{
      fontSize:18,
      color:COLOR.blue
    },
    nameU:{ 
      fontSize:18,
      color:COLOR.red,
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