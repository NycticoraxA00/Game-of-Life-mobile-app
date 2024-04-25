import { View,Pressable } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import { COLOR } from "../../util/color";

const IconButton = ({ icon, size, color, onPress }) => {
  return (
    <Pressable 
      onPress = {onPress} 
      style={({pressed})=>pressed && styles.pressed}>
      <View style={styles.container}>
        <Icon name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
};
const styles = {
    container:{
      borderRadius: 24,
      padding: 6,
      marginHorizontal:10,
      marginVertical:10,
    },
    pressed:{
      opacity:0.8,
      boderWidth:10,
      boderColor:COLOR.black,
      borderRadius:50,
    }
};
export default IconButton;
