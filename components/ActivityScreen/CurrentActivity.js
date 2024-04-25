import { View, Text } from "react-native";
import Activity from "./Activity";

const CurrentActivity=({name})=>{
    return(
        <View style={styles.container}>
            <Text style={styles.label}>Current {name} </Text>
            <Activity icon={"star-o"} name={"Join hobby club"} benefit={""} energy={100}/>
        </View>
    )
}
const styles={
    container:{
        alignItems:'center',
        justifyContent:'center'
    },
    label:{
        fontSize:24,
        padding:10,
    }
}
export default CurrentActivity;