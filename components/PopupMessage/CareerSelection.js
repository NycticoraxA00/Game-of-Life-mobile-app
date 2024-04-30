import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert} from 'react-native';
import { Overlay } from 'react-native-elements';
import { COLOR } from '../../util/color';
import Button from'../UI/Button';
import { StatContext } from '../../store/stat-context';
import { CareerOption } from '../../constant/career-path';
import { LogContext } from '../../store/log-context';
import IconButton from '../UI/IconButton';
const CareerSelection = ({ visible, onClose}) => {
  const [careersAvailable, setCareersAvailable]=useState([]);
  const statCtx = useContext(StatContext);
  const logCtx = useContext(LogContext);
  useEffect(() => {
    const updateCareersAvailable = () => {
      const updatedCareers = [];
      if (statCtx.getSubjectCredits('math') >= 6000 &&
          statCtx.getSubjectCredits('science') >= 6000) 
      {
        updatedCareers.push(CareerOption[0]);
      }
      if (statCtx.getSubjectCredits('math') >= 9000 &&
      statCtx.getSubjectCredits('science') >= 3000) {
        updatedCareers.push(CareerOption[1]);
      }
      if (statCtx.getSubjectCredits('social') >= 6000 &&
      statCtx.getSubjectCredits('math') >= 6000) {
        updatedCareers.push(CareerOption[2]);
      }
      if (statCtx.getSubjectCredits('math') >= 3000 &&
      statCtx.getSubjectCredits('social') >= 9000) {
        updatedCareers.push(CareerOption[3]);
      }
      if (statCtx.getSubjectCredits('math') >= 3000 &&
      statCtx.getSubjectCredits('art') >= 9000) {
        updatedCareers.push(CareerOption[4]);
      }
      setCareersAvailable(updatedCareers);
    };

    updateCareersAvailable();
  }, [statCtx]);
  let careersAvailableText;
  let content;
  if (careersAvailable.length == 0) {
    careersAvailableText = 'None'
    content = (
      <View style={styles.footer}>
        <IconButton
          icon="arrow-circle-left"
          size={50}
          color={COLOR.darkGrey}
          onPress={closePopupMessage}
        />
      </View>
    )
  } else {
    careersAvailableText = ''
    content = (
      careersAvailable.map((career, index) => (
        <>
        <Button 
          key={index} 
          name={career}
          onPress = {()=>careerSelectionHandler(career)}/>
        </>
      ))
      )
  }
  const careerSelectionHandler=(career)=>{
    statCtx.determineCareerPath(career);
    logCtx.detectAction('You choose the career path:', career);
    onClose(); 
  }
  const closePopupMessage = () => {
    Alert.alert('Are you sure you do not want to pcik your career')
    onClose(); 
  };

  return (
    <Overlay isVisible={visible}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>You have finished you education</Text>
        <Text style={styles.text}>Career path available: {careersAvailableText}</Text>
      </View>
      {content}
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
  footer: {
    alignItems: "center",
    justifyContent: "center",
  },
};

export default CareerSelection;