import { View, Text, TextInput } from "react-native";
import { COLOR } from "../../util/color";

const Input = ({
    label, 
    onUpdateValue,
    keyboardType, 
    secure,
    value,
    // isInvalid
})=>{
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput 
                style={styles.input}
                onUpdateValue={onUpdateValue}
                autoCapitalize={false}
                keyboardType={keyboardType}
                secureTextEntry={secure}
                onChangeText={onUpdateValue}
                value={value}
                ></TextInput>
        </View>
    )
}
const styles={
    label:{
        padding:5,
        fontSize:15,
    },
    input:{
        borderRadius:3,
        width:300,
        height:50,
        backgroundColor:COLOR.white,
        paddingHorizontal: 10
    }
}
export default Input;