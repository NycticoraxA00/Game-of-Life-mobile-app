import { View, Text } from "react-native";
import { COLOR } from "../../util/color";
import { useContext } from "react";
import { StatContext } from "../../store/stat-context";

const EducationInfo = ()=>{
    const statCtx = useContext(StatContext);
    return(
        <View style={styles.container}>
            {statCtx.stage >=3 ? (
                <Text style={styles.text}>
                    Finished Education
                </Text>
            ):(
            <>
                <Text style={styles.text}>Grade: {Math.floor(statCtx.week/48)+5}</Text>
                <Text style={styles.text}>Life Stage: {statCtx.stage}</Text>
            </>
            )}
        </View>
    )
}

const styles={
    container:{
        marginTop: 50,
        alignItems: 'center',
        marginHorizontal:30,
        borderWidth:2,
        borderColor:COLOR.darkGrey,
        borderRadius:5,
        padding:5,
    },
    text:{
        fontSize:20,
        fontWeight:400,
        // paddingTop:3
    }
}
export default EducationInfo;