import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Button from "../../../components/UI/Button";
import SubjectEnergy from "../../../components/StudyScreen/SubjectEnergy";
import { COLOR } from "../../../util/color";
import IconButton from "../../../components/UI/IconButton";
import { SubjectContext } from "../../../store/subject-context";
import { StatContext } from "../../../store/stat-context";
import { LogContext } from "../../../store/log-context";

const SubjectManager = ({route}) => {
  const navigation = useNavigation();
  const {subject, subjectEnergy} = route.params;
  const goBack = () => {
    navigation.goBack();
  };
  const subjectCtx = useContext(SubjectContext);
  const statCtx = useContext(StatContext);
  const logCtx = useContext(LogContext);
  const handleSubjectEnergyChange=(subject, energy)=>{
    subjectCtx.changeSubjectEnergy(subject,energy);
    statCtx.adjustEnergy(statCtx.energy+subjectCtx.getSubjectEnergy(subject)-energy);
    logCtx.detectAction('You spend '+ energy +' energy weekly for subject:', subject);
    logCtx.addNewStatChangeLog('Current energy: '+(statCtx.energy+subjectCtx.getSubjectEnergy(subject)-energy));
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.name}>{subject}</Text>
            <Text style={styles.subText}>Choose the amount of energy you wish to spend for this subject through this life stage</Text>
        </View>
        <View style={styles.body}>
            <SubjectEnergy 
                onPress={()=>handleSubjectEnergyChange(subjectEnergy,0)}
                energy={0} credits={0}/>
            <SubjectEnergy 
                onPress={()=>handleSubjectEnergyChange(subjectEnergy,5)}
                energy={5} credits={5}/>
            <SubjectEnergy 
                onPress={()=>handleSubjectEnergyChange(subjectEnergy,10)}
                energy={10} credits={10}/>
            <SubjectEnergy 
                onPress={()=>handleSubjectEnergyChange(subjectEnergy,15)}
                energy={15} credits={15}/>
        </View>
        <View style={styles.footer}>
            <IconButton 
                icon = "arrow-circle-left" size ={50} color = {COLOR.darkGrey}
                onPress={goBack}/>
        </View>
    </View>
  );
};
const styles={
    container:{

    },
    header:{
        alignItems:'center',
        justifyContent:'center'
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
export default SubjectManager;