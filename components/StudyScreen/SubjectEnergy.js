import { View, Text, TouchableOpacity } from "react-native";
import { COLOR } from "../../util/color";

const SubjectEnergy=({energy, credits, onPress})=>{
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress= {onPress}>
                <View style={styles.content}>
                    <View style={styles.energyContainer}>
                        <Text style={styles.buttonText}>{energy} energy/week</Text>
                    </View>
                    <View style={styles.creditsContainer}>
                        <Text style={styles.buttonText}>+ {credits} credits</Text>
                    </View>
                </View>
            </TouchableOpacity>
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
    energyContainer:{
        minWidth:'50%',
    },
    creditsContainer:{
        minWidth:'50%',
    },
    buttonText:{
        textAlign:'center',
        fontSize:20,
    },
    pressed:{
        opacity:0.8,
        borderRadius:10,
        backgroundColor:COLOR.lightGrey,
        color:'white',
        borderRadius:20
    },
}
export default SubjectEnergy;