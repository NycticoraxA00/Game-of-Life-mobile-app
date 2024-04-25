import { ActivityIndicator, Text,View } from "react-native";
import { COLOR } from "../../util/color";

const LoadingOverlay = ({message})=>{
    return(
        <View style={styles.container}>
            <Text style={styles.message}>{message}</Text>
            <ActivityIndicator size='large'/>
        </View>
    )
}
const styles={
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:32,
        backgroundColor:COLOR.grey
    },
    message:{
        fontSize: 16,
        marginBottom: 12,
    }
}
export default LoadingOverlay;