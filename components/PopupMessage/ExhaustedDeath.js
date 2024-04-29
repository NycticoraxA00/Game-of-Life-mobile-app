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
const ExhaustedDeath = ({ visible, onClose }) => {

  const statCtx = useContext(StatContext);
  const logCtx = useContext(LogContext);
  const authCtx = useContext(AuthContext);


  const resetGame = () => {
    statCtx.resetGame();
    logCtx.clearLogs();
    onClose();
  };

  return (
    <Overlay isVisible={visible}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>You died</Text>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Ignoring the importance of self-care can drained your health point .</Text>
        </View>
        <Text style={styles.highlightedText}>Manage your energy wisely !!</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={resetGame}>
          <Text style={styles.switch}>Restart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={authCtx.logout}>
          <Text style={styles.switch}>Log out</Text>
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
  textContainer:{ 
    flexDirection:'row',
  },
  highlightedText:{
    fontSize:20,
    color:COLOR.red,
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

export default ExhaustedDeath;