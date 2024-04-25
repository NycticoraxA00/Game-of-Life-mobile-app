import { View, Text } from "react-native"
import Job from "./Job";

const CurrentJob=({name,onPress})=>{
    return(
        <View style={styles.container}>
            <Text style={styles.label}>
                Current {name} Job
            </Text>
            <Job 
                name={"Job name"}
                icon={"spinner"}
                payrate={100}
                energy={100}
                onPress={onPress} readOnly={false} isNavigate/>
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
export default CurrentJob;