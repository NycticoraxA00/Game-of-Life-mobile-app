import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { ProgressBar } from 'react-native-paper';

import { COLOR } from "../../util/color";
import { StatContext } from "../../store/stat-context";
import { LogContext } from "../../store/log-context";
import { SubjectContext } from "../../store/subject-context";

const LifeProgress = () => {
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
      statCtx.earnMoney(fullTimeJob.salary.salary, numb);
    }
    if (partTimeJob !== '') {
      statCtx.earnMoney(partTimeJob.salary, numb);
    }
    if (freelancerJob !== '') {
      statCtx.earnMoney(freelancerJob.salary, 4);
    }
    if (numb >=4){
      statCtx.adjustEnergy(
        statCtx.energy 
        + statCtx.getJobByJobType('Freelancer').cost);
      statCtx.quitJob('Freelancer');
    }
    if (numb > statCtx.getActByActType('Skill').behavior){
      statCtx.adjustEnergy(
        statCtx.energy 
        + statCtx.getActByActType('Skill').cost);
      statCtx.quitAct('Skill');
    }
    statCtx.gainActBenefit();
    statCtx.gainSkill(numb);
    logCtx.detectAction('Skip week', '+' + numb + ' weeks');
    // logCtx.detectStatChange('You learned the skill: '+ statCtx.skills[statCtx.skills.length-1])
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
    } else {
      newProgress = totalWeek / totalWeekRange;
      setButtonText("Skip Stage");
    }

    setProgress(newProgress);
    setStageText(getStageText(newStage));
    setCurrentStageTotalWeek(`/ ${totalWeekRange}`);
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
    if (currentStage === 4) {
      Alert.alert("Are you sure? This will end your life.", "", [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "End Life", onPress: () => statCtx.endLife() },
      ]);
    } else {
      let weekToSkip;
      switch (currentStage) {
        case 1:
          weekToSkip = 313 - totalWeek;
          break;
        case 2:
          weekToSkip = 625 - totalWeek;
          break;
        case 3:
          weekToSkip = 2593 - totalWeek;
          break;
        default:
          break;
      }
      statCtx.addWeek(weekToSkip);
      updateSubjectCredits(weekToSkip);
      logCtx.detectAction("Skip to stage", "", currentStage + 1);
    }
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