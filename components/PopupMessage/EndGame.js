import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert} from 'react-native';
import { Overlay } from 'react-native-elements';
import { COLOR } from '../../util/color';
import Button from'../UI/Button';
import { StatContext } from '../../store/stat-context';
import { CareerOption } from '../../constant/career-path';
import { LogContext } from '../../store/log-context';
import IconButton from '../UI/IconButton';
import { AuthContext } from '../../store/auth-context';
import { SubjectContext } from '../../store/subject-context';
import LifeGoals from '../UI/LifeGoal';
const EndGame = ({ visible, onClose}) => {
  const [achievedLifeGoals, setAchievedLifegoals]=useState([]);
  const statCtx = useContext(StatContext);
  const logCtx = useContext(LogContext);
  const authCtx = useContext(AuthContext);
  const subjectCtx = useContext(SubjectContext);
  useEffect(() => {
    const updateCareersAvailable = () => {
      const updatedAchievedLifeGoals = [];
      if (statCtx.money >= 10000) {
        updatedAchievedLifeGoals.push('Buy a car');
      }
      if (statCtx.money >= 20000) {
        updatedAchievedLifeGoals.push('Buy a house');
      }
      if (statCtx.money >= 50000) {
        updatedAchievedLifeGoals.push('Marriage');
      }
      if (statCtx.money >= 100000) {
        updatedAchievedLifeGoals.push('Child Expense');
      }
      if (statCtx.money >= 10000000) {
        updatedAchievedLifeGoals.push('Started up a business');
      }
      if (statCtx.money >= 100000000) {
        updatedAchievedLifeGoals.push('Founded a company');
      }
      setAchievedLifegoals(updatedAchievedLifeGoals);
    };
    updateCareersAvailable();
  },[statCtx]);
  let achievementText;
  let content;
  if (achievedLifeGoals.length == 0) {
    achievementText = 'None'
    content = (
      <View style={styles.footer}>
        <IconButton
          icon="arrow-circle-left"
          size={50}
          color={COLOR.darkGrey}
          onPress={''}
        />
      </View>
    )
  } else {
    achievementText = ''
    content = (
        <View style={styles.footer}>
        {achievedLifeGoals.map((goal, index) => (
            <LifeGoals key={index} name={goal} icon ={'star'}/>
        ))}
        </View>
    );
  }
  const resetGame = ()=>{
    statCtx.resetGame();
    logCtx.clearLogs();
    subjectCtx.resetGame();
    onClose();
}
  return (
    <Overlay isVisible={visible}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>You have finished the game</Text>
        <Text style={styles.money}>Money: {statCtx.money}</Text>
        <Text style={styles.money}>Age: {(Math.floor((statCtx.week + 240) / 48))}</Text>
        <Text style={styles.text}>Base on your money, you have complete these life goals: {achievementText}</Text>
      </View>
      {content}
      <View style ={styles.buttonContainer}>
        <TouchableOpacity onPress={resetGame}>
            <Text style={styles.switch}>Restart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={authCtx.logout}>
            <Text style={styles.switch}>Log out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.saveButton}>
        <TouchableOpacity onPress={''}>
            <Text style={styles.switch}>Save your highscore</Text>
        </TouchableOpacity>
      </View>
    </Overlay>
    
  );
};

const styles = {
  titleContainer:{
    marginVertical:10,
    marginHorizontal:20,
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:5,
  },
  text:{
    fontSize:20,
    textAlign:'center',
  },
  money:{
    fontSize:20,
    color:COLOR.gold,
    textAlign:'center',
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  switch:{
    fontSize:17,
    paddingVertical:12,
    paddingHorizontal:23,
    color:COLOR.white,
    fontWeight:'bold',
    minWidth:'40%',
    textAlign:'center',
    backgroundColor:COLOR.darkGrey,
    borderRadius:5,
    margin:5
},
};

export default EndGame;