import { View,Text, TouchableOpacity } from "react-native";
import Activity from "../../../components/ActivityScreen/Activity";
import { useNavigation } from '@react-navigation/native';
import Button from "../../../components/UI/Button";
import { COLOR } from "../../../util/color";
import IconButton from "../../../components/UI/IconButton";
import { ACT_INFO } from "../../../data/act-data";
import React, { useContext } from "react";
import { StatContext } from "../../../store/stat-context";
import { LogContext } from "../../../store/log-context";
import AvailableEnergy from "../../../components/UI/AvailableEnergy";

const ActivityChoices=({route})=>{
    const navigation = useNavigation();
    const statCtx = useContext(StatContext);
    const logCtx = useContext(LogContext);
    const {actType} = route.params;
    const joinActivity = (actId) => {
        const currentAct = statCtx.getActByActType(actType);
        const newAct = statCtx.getActById(actId);
        
          if (currentAct === '') {
            statCtx.adjustEnergy(statCtx.energy - newAct.cost);
          } else {
            statCtx.adjustEnergy(statCtx.energy + currentAct.cost - newAct.cost);
          }
          statCtx.changeAct(actId, actType);
          if (actType=='Skill'){
            
            statCtx.beginLearnignCurrentSkillWeek = statCtx.week;
            logCtx.detectAction('Your choose to learn the skill: ', newAct.actName);
          } else {
            logCtx.detectAction('You join '+newAct.actName+' in',actType );
          }
          navigation.goBack();
      };
    const goBack = () => {
      navigation.goBack();
    }
    return(
        <View style={styles.container}>
        <View style={styles.header}>
            {actType === 'Skill' ? (
            <Text style={styles.name}>Learn new Skill</Text>
            ) : (
                <Text style={styles.name}>{actType}</Text>
            )}
            <AvailableEnergy/>
            
            {actType === 'Skill' && (
              
            <View style={styles.outerSkillsContainer}>
              <View style={styles.innerSkillsContainer}>
              <Text style={styles.skillTitle}>Learned skills: {statCtx.skills.length == 0?'No skill':''}</Text>

              <View style = {styles.skillContainer}>
                {statCtx.skills.map((skill, index) => (
                  <Text key={index} style={styles.skill}>
                    {skill}
                  </Text>
                ))}
              </View>
              </View>
            </View>
        )}
        </View>
        <View style={styles.body}>
        {(actType === 'Skill' && statCtx.stage < 3) ? (
          <Text style={styles.warningText}>You need to finish your education first</Text>
        ) : (
          ACT_INFO.filter((act) => act.actType === actType && !statCtx.skills.includes(act.actName))
          .map((act) => (
            <React.Fragment key={act.aid}>
              <Activity 
                icon={act.actIcon} 
                name={act.actName} 
                behavior={act.behavior} 
                energy={act.cost}
                actType={act.actType}
                onPress={() => joinActivity(act.aid)}
              />
              <View style={styles.space} />
            </React.Fragment>
          ))
        )}
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
    outerSkillsContainer:{
      alignItems: "center",
      width:400,
    },
    innerSkillsContainer:{
      alignItems: "center",
      justifyContent: "center",
      flexDirection:'row',
    },
    skillTitle:{
      fontSize:18,
    },
    skill:{
      fontSize:18,
      color:COLOR.gold,
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
    subText:{
        marginVertical:20,
        marginHorizontal:20,
        textAlign:'center',
        fontSize:18
    },
    footer:{
        alignItems:'center',
        justifyContent:'center',

    },
    warningText:{
        fontSize:18,
        color:COLOR.red,
        // backgroundColor:COLOR.white,
        marginBottom:20,
      }
}
export default ActivityChoices;