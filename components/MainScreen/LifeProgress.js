import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { ProgressBar } from 'react-native-paper';

import { COLOR } from "../../util/color";
import { StatContext } from "../../store/stat-context";
import { LogContext } from "../../store/log-context";
import { SubjectContext } from "../../store/subject-context";

const LifeProgress = ({endGame}) => {
  const statCtx = useContext(StatContext);
  const logCtx = useContext(LogContext);
  const subjectCtx = useContext(SubjectContext);

  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState("");
  const [currentStageTotalWeek, setCurrentStageTotalWeek] = useState("");
  const [buttonText, setButtonText] = useState("");
  
  const updateSubjectCredits = (numb)=>{
    const subjectCredits = statCtx.subjectCredits;
    const currentStage = statCtx.stage;
    if (currentStage < 3) {
      for (let subjectName in subjectCredits) {
        const subjectEnergy = subjectCtx.getSubjectEnergy(subjectName);
        const creditsToAdd = subjectEnergy * numb;
        statCtx.addSubjectCredits(subjectName, creditsToAdd);
      }
    }
  }
  const fullTimeJob = statCtx.getJobByJobType('Full-time');
  const partTimeJob = statCtx.getJobByJobType('Part-time');
  const freelancerJob = statCtx.getJobByJobType('Freelancer');
  const handleAddWeek = (numb) => {
    statCtx.addWeek(numb); 
    if (fullTimeJob !== '') {
      statCtx.earnMoney(fullTimeJob.salary, numb);
      logCtx.addNewStatChangeLog('You earn '+(fullTimeJob.salary*numb)+' from your current Full-time Job')
    }
    if (partTimeJob !== '') {
      statCtx.earnMoney(partTimeJob.salary, numb);
      logCtx.addNewStatChangeLog('You earn '+(partTimeJob.salary*numb)+' from your current Part-time Job')
    }
    if (freelancerJob !== '') {
      statCtx.earnMoney(freelancerJob.salary, 4);
      logCtx.addNewStatChangeLog('You earn '+(freelancerJob.salary*4)+' from your current Freelancer Job')
    }
    if (numb >=4 && statCtx.getJobByJobType('Freelancer')){
      statCtx.adjustEnergy(
        statCtx.energy 
        + statCtx.getJobByJobType('Freelancer').cost);
        logCtx.addNewStatChangeLog('You completed '+statCtx.getJobByJobType('Freelancer').jobName+' freelancer job')
      statCtx.quitJob('Freelancer');
    }
    if (numb > statCtx.getActByActType('Skill').behavior && statCtx.getActByActType('Skill')){
      statCtx.adjustEnergy(
        statCtx.energy 
        + statCtx.getActByActType('Skill').cost);
      logCtx.addNewStatChangeLog('You finished learning ',statCtx.getActByActType('Skill').actName)
      statCtx.quitAct('Skill');
    }
    if(statCtx.stage==2 && statCtx.week+numb>=625){

      logCtx.addNewStatChangeLog('You have finished education')
      statCtx.adjustEnergy(
        statCtx.energy+ 
        subjectCtx.getSubjectEnergy("math")+
        subjectCtx.getSubjectEnergy("science")+
        subjectCtx.getSubjectEnergy("social")+
        subjectCtx.getSubjectEnergy("language")+
        subjectCtx.getSubjectEnergy("art")
      )
      if(statCtx.getSubjectCredits("language")+ subjectCtx.getSubjectEnergy("language")*numb>=6000){
        statCtx.enableCanWorkAbroad();
        logCtx.addNewStatChangeLog('You has been qualfied to work abroad')}
    }
    if(statCtx.stage==3 && statCtx.week+numb>=2592){
      let energyRegain=0;
      if ( statCtx.jobs.fullTimeJob !== '') {
        energyRegain += fullTimeJob.cost;
        statCtx.quitJob('Full-time');
      }
      if (statCtx.jobs.partTimeJob !== '') {
        energyRegain += partTimeJob.cost;
        statCtx.quitJob('Part-time');
      }
      if (statCtx.jobs.freeLancer !== '') {
        energyRegain += freelancerJob.cost;
        statCtx.quitJob('Freelancer');
      }
      statCtx.adjustEnergy(statCtx.energy + energyRegain)
      logCtx.addNewStatChangeLog('You have retired')
    }

    if(statCtx.energy<0){
      const healthDrained = (statCtx.energy*-1)*numb/100;
      console.log(healthDrained);
      statCtx.drainHealth(healthDrained);
    }
    
    statCtx.gainActBenefit();
    statCtx.gainSkill(numb);
    logCtx.detectAction('Skip week', '+' + numb + ' weeks');
    logCtx.addNewStatChangeLog(
      'Your current age is: ' + 
      (Math.floor((statCtx.week + numb + 240) / 48)));  
    updateSubjectCredits(numb);
  };

  const totalWeek = statCtx.week;
  const currentStage = statCtx.stage;

  useEffect(() => {
    const calculateStage = () => {
      if (totalWeek >= 0 && totalWeek < 312) {
        return { newStage: 1, totalWeekRange: 312 };
      } else if (totalWeek >= 312 && totalWeek < 624) {
        return { newStage: 2, totalWeekRange: 624 };
      } else if (totalWeek >= 624 && totalWeek < 2592) {
        return { newStage: 3, totalWeekRange: 2592 };
      } else if (totalWeek >= 2592) {
        return { newStage: 4, totalWeekRange: 1 };
      }
    };
    
    const { newStage, totalWeekRange } = calculateStage();
    if (currentStage !== newStage) {
      statCtx.upStage(newStage);
    }

    let newProgress;
    if (newStage === 4) {
      newProgress = 1;
      setButtonText("End Life");
      setCurrentStageTotalWeek(``);
    } else {
      newProgress = totalWeek / totalWeekRange;
      setButtonText("Skip Stage");
      setCurrentStageTotalWeek(`/ ${totalWeekRange}`);
    }

    setProgress(newProgress);
    setStageText(getStageText(newStage));
  }, [totalWeek, currentStage]);

  const getStageText = (stage) => {
    switch (stage) {
      case 1:
        return "Primary";
      case 2:
        return "Secondary";
      case 3:
        return "Adult";
      case 4:
        return "Retired";
      default:
        return "";
    }
  };

  const handleSkipStage = () => {
    let weekToSkip;
    switch (currentStage) {
      case 1:
        weekToSkip = 313 - totalWeek;
        break;
      case 2:
        weekToSkip = 625 - totalWeek;
        break;
      case 3:
        weekToSkip = 2640 - totalWeek;
        break;
      case 4:
        weekToSkip = statCtx.health*10;
        endGame();
        break;
      default:
        break;
    }
    handleAddWeek(weekToSkip);
    logCtx.detectAction("Skip to stage", currentStage + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleAddWeek(-100)}>
          <Text style={styles.switch}>-100 weeks</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAddWeek(100)}>
          <Text style={styles.switch}>+100 weeks</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSkipStage}>
          <Text style={styles.switch}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.stageContainer}>
        <Text style={styles.stage}>Life Stage: {stageText}</Text>
        <ProgressBar
          style={styles.progress}
          progress={progress}
          color={COLOR.green}
        />
        <Text style={styles.countdown}>
          Current week: {totalWeek} {currentStageTotalWeek}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    marginHorizontal: 28,
    marginVertical: 20,
    borderRadius: 5,
    borderWidth: 2.5,
    borderColor: COLOR.black,
  },
  stageContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  stage: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  switch: {
    fontSize: 17,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginHorizontal: 7,
    color: COLOR.blue,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: COLOR.blue,
    borderRadius: 5,
    margin: 5,
  },
  progress: {

  },
  countdown: {
    textAlign: 'center',
    padding: 10,
    fontSize: 22,
  }
};

export default LifeProgress;