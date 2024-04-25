import React, { createContext, useEffect, useState } from 'react';

export const StatContext = createContext({
  week:0,
  stage:1,
  health:0,
  energy:0,
  maxEnergy:0,
  money:0,
  subject:['math', 'science', 'social','language', 'art'],
  subjectCredits:[{
    math: 0,
    science: 0,
    social: 0,
    language: 0,
    art: 0,
  }],
  careerPath:'',
  jobs:[{
    partTimeJob:'',
    fullTimeJob:'',
    freeLancer:'',
  }],
  addWeek:(week)=>{},
  upStage:()=>{},
  adjustEnergy:()=>{},
  skipStage:()=>{},
  endLife:()=>{},
  resetGame:()=>{},
  changeSubjectCredits:()=>{},
  addSubjectCredits:()=>{},
  getSubjectCredits:()=>{},
  determineCareerPath:()=>{},
});

const StatContextProvider = ({ children }) => {
    const [week, setWeek] = useState(0); 
    const [stage, setStage] = useState(1);
    const [health, setHealth] = useState(100);
    const [energy, setEnergy] = useState(100);
    const [money, setMoney] = useState(100);
    const [subjectCredits, setSubjectCredits] = useState({
      math: 0,
      science: 0,
      social: 0,
      language: 0,
      art: 0,
    });
    const [careerPath,setCareerPath]= useState('');
    const determineCareerPath = (path) => {
      setCareerPath(path);
    };

    const [jobs, setJobs] = useState({
      partTimeJob:'',
      fullTimeJob:'',
      freeLancer:'',
    });
    
    const changeSubjectCredits = (subject, energy) => {
      setSubjectCredits((prevCredits) => ({
        ...prevCredits,
        [subject]: energy,
      }));
    };
    const addSubjectCredits = (subject, energy) => {
      setSubjectCredits((prevCredits) => ({
        ...prevCredits,
        [subject]: prevCredits[subject] + energy,
      }));
    };
    const getSubjectCredits = (subject)=>{
      return subjectCredits[subject];
    }

    const changeFulltimeJob = (job)=>{
      
    }
    const changeParttimeJob = (job)=>{
      
    }
    const changeFreelancerJob = (job)=>{
      
    }

    const addWeek = (numb)=>{
      setWeek((preWeek)=>preWeek+numb);
    }
    const skipStage = (weeks)=>{
      setWeek(weeks);
    }
    const upStage = (numb)=>{
      setStage(numb);
    }
    const adjustEnergy = (energy)=>{
      setEnergy(energy);
    }
    const endLife = ()=>{
      addWeek(health);
      setHealth(0);
    }
    const resetGame = ()=>{
      setWeek(0);
      setStage(1);
      setHealth(100);
      setEnergy(100);
      setMoney(100);
      setSubjectCredits({
        math: 0,
        science: 0,
        social: 0,
        language: 0,
        art: 0,
      })
    }
    const value = {
      week:week,
      stage:stage,
      health:health,
      energy:energy,
      money:money,
      subjectCredits:subjectCredits,
      jobs:jobs,
      careerPath:careerPath,
      addWeek:addWeek,
      upStage:upStage,
      adjustEnergy:adjustEnergy,
      skipStage:skipStage,
      endLife:endLife,
      resetGame:resetGame,
      changeSubjectCredits:changeSubjectCredits,
      addSubjectCredits:addSubjectCredits,
      getSubjectCredits:getSubjectCredits,
      determineCareerPath:determineCareerPath,
    };
    return (
      <StatContext.Provider value={value}>
        {children}
      </StatContext.Provider>
    );
  };

export default StatContextProvider;