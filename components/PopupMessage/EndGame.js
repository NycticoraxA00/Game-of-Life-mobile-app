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
import LifeGoal from '../UI/LifeGoal';
const EndGame = ({ visible, onClose }) => {
  const initialLifeGoals = [
    { name: 'Buy a car', cost: 10000,achieved: false },
    { name: 'Buy a house', cost: 20000,achieved: false },
    { name: 'Marriage', cost: 50000,achieved: false },
    { name: 'Child Expense', cost: 100000,achieved: false },
    { name: 'Started up a business', cost: 1000000,achieved: false },
    { name: 'Founded a company', cost: 5000000,achieved: false },
  ];
  const [achievedLifeGoals, setAchievedLifeGoals] = useState(initialLifeGoals);
  const statCtx = useContext(StatContext);
  const logCtx = useContext(LogContext);
  const authCtx = useContext(AuthContext);
  const subjectCtx = useContext(SubjectContext);

  useEffect(() => {
    const updateCareersAvailable = () => {
      const updatedLifeGoals = achievedLifeGoals.map((goal) => {
        if (!goal.achieved && statCtx.money >= goal.cost) {
          return { ...goal, achieved: true };
        }
        return goal;
      });
      setAchievedLifeGoals(updatedLifeGoals);
    };
    updateCareersAvailable();
  }, [statCtx]);

  const resetGame = () => {
    statCtx.resetGame();
    logCtx.clearLogs();
    subjectCtx.resetGame();
    onClose();
  };
  const logoutHandler = ()=>{
    authCtx.logout;
  }
  const savehighScoreHandler=()=>{

  }
  return (
    <Overlay isVisible={visible}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>You have finished the game</Text>
        <View style={styles.statContainer}>
          <Text style={styles.statText}>Age: </Text>
          <Text style={styles.stat}>{Math.floor((statCtx.week + 240) / 48)}</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statText}>Money: </Text>
          <Text style={styles.stat}>{statCtx.money}</Text>
        </View>
        
        <Text style={styles.text}>
          Based on your money, you have completed these life goals:
        </Text>
      </View>
      <View style={styles.footer}>
        {achievedLifeGoals.map((goal, index) => (
          <LifeGoal 
            key={index} 
            name={goal.name} 
            cost={goal.cost}
            achieved={goal.achieved} />
        ))}
        
      </View>
      <Text style={styles.text}>
        Inheritance (Highscore): 
      </Text>
      <Text style={styles.stat}>
        {statCtx.money - 100000000>0?statCtx.money - 100000000:0}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={resetGame}>
          <Text style={styles.switch}>Restart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logoutHandler}>
          <Text style={styles.switch}>Log out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.saveButton}>
        <TouchableOpacity onPress={savehighScoreHandler}>
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
    alignItems: "center",
    justifyContent: "center",
  },
  statContainer:{ 
    flexDirection:'row',
  },
  statText:{
    fontSize:20,
    // color:COLOR.blue,
  },
  stat:{
    fontSize:20,
    color:COLOR.gold,
    textAlign:'center',
    fontWeight:'bold',
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