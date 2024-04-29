import { useContext } from "react";
import { StatContext } from "../../store/stat-context";
import { View,Text } from "react-native";
import { COLOR } from "../../util/color";
const AvailableEnergy = ()=>{
    const statCtx = useContext(StatContext);
    return (
        <View style={styles.availableEnergyContainer}>
            <Text style={styles.availableEnergy}>Available Weekly Energy:</Text>
            <Text style={styles.availableEnergyAmount}>{statCtx.energy}</Text>
        </View>
    )   
}
const styles={
    availableEnergyContainer: {
        borderRadius: 20,
        minWidth: "60%",
        flexDirection: "row",
        justifyContent:'center',
        alignItem:'center',
        padding:10,
      },
      availableEnergy: {
        minWidth: "52%",
      },
      availableEnergyAmount: {
        textAlign: "center",
        color: COLOR.blue,
        fontWeight: 'bold',
        fontSize: 15,
      },
}
export default AvailableEnergy;