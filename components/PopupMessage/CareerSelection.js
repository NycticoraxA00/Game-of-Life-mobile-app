import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { Overlay } from 'react-native-elements';
import { COLOR } from '../../util/color';
import Button from'../UI/Button';
import { StatContext } from '../../store/stat-context';
import { CareerOption } from '../../constant/career-path';
import { LogContext } from '../../store/log-context';
const CareerSelection = ({ visible, onClose}) => {
  const [careersAvailable, setCareersAvailable]=useState([]);
  const statCtx = useContext(StatContext);
  const logCtx = useContext(LogContext);
  useEffect(() => {
    const updateCareersAvailable = () => {
      const updatedCareers = [];
      if (statCtx.getSubjectCredits('math') >= 0) {
        updatedCareers.push(CareerOption[0]);
      }
      if (statCtx.getSubjectCredits('math') >= 0) {
        updatedCareers.push(CareerOption[1]);
      }
      if (statCtx.getSubjectCredits('math') >= 0) {
        updatedCareers.push(CareerOption[2]);
      }
      if (statCtx.getSubjectCredits('math') >= 0) {
        updatedCareers.push(CareerOption[3]);
      }
      if (statCtx.getSubjectCredits('math') >= 0) {
        updatedCareers.push(CareerOption[4]);
      }
      setCareersAvailable(updatedCareers);
    };

    updateCareersAvailable();
  }, [statCtx]);
  const careerSelectionHandler=(career)=>{
    statCtx.determineCareerPath(career);
    logCtx.detectAction('You choose the career path:', career);
    onClose(); 
  }
  const closePopupMessage = () => {
    onClose(); 
  };

  return (
    <Overlay isVisible={visible}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>You have finished you education</Text>
        <Text style={styles.text}>Career path available:</Text>
      </View>
      
      {careersAvailable.map((career, index) => (
        <>
        <Button 
          key={index} 
          name={career}
          onPress = {()=>careerSelectionHandler(career)}/>
        </>
      ))}
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
};

export default CareerSelection;