import { View,Text, TouchableOpacity } from "react-native";
import Activity from "../../../components/ActivityScreen/Activity";
import { useNavigation } from '@react-navigation/native';
import Button from "../../../components/UI/Button";
import { COLOR } from "../../../util/color";
import IconButton from "../../../components/UI/IconButton";

const ActivityChoices=({route})=>{
    const navigation = useNavigation();
    const {header} = route.params;
    const goBack = () => {
      navigation.goBack();
    }
    return(
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.name}>{header}</Text>
            <View style={styles.availableEnergyContainer}>
                <Text style={styles.availableEnergy}>Available Weekly Energy:</Text>
                <Text style={styles.availableEnergyAmount}>100</Text>
            </View>
        </View>
        <View style={styles.body}>
            <Activity icon={"star-o"} name={"Join hobby club"} benefit={""} energy={100}/>
            <View style={styles.space}/>
            <Activity icon={"home"} name={"Spend time with family"} benefit={""} energy={100}/>
            <View style={styles.space}/>
            <Activity icon={"comments-o"} name={"Hang out with friend"} benefit={""} energy={100}/>
            <View style={styles.space}/>
            <Activity icon={"plus"} name={"Join a charity organiztion"} benefit={""} energy={100}/>
        </View>
        <View style={styles.footer}>
            <IconButton 
                icon = "arrow-circle-left" size ={50} color = {COLOR.darkGrey}
                onPress={goBack}/>
        </View>
        </View>
  );
}
const styles={
    container:{

    },
    header:{
        alignItems:'center',
        justifyContent:'center'
    },
    body:{
        marginTop:30,
        alignItems:'center',
        justifyContent:'center'
    },
    space:{
        height:30,
    },
    name:{
        marginTop:80,
        fontSize:24,
        borderWidth:2,
        borderColor:COLOR.darkGrey,
        borderRadius:25,
        minWidth:'80%',
        textAlign:'center',
        minHeight:50,
        padding:10,
        marginBottom:20,
    },
    availableEnergyContainer:{
        // backgroundColor:COLOR.white,
        borderRadius:20,
        minWidth:'60%',
        flexDirection:'row',
    },
    availableEnergy:{
        minWidth:'52%',
    },
    availableEnergyAmount:{
        textAlign:'center',
        color:COLOR.blue,
        fontWeight:'bold',
        fontSize:15
    },
    subText:{
        marginVertical:20,
        marginHorizontal:20,
        textAlign:'center',
        fontSize:18
    },
    footer:{
        alignItems:'center',
        justifyContent:'center',

    }
}
export default ActivityChoices;