import React, { createContext, useEffect, useState } from 'react';
import { JOB_INFO } from '../data/job-data';
import { ACT_INFO } from '../data/act-data';

export const StatContext = createContext({
  week:0,
  age:0,
  stage:1,
  health:0,
  energy:0,
  maxEnergy:0,
  money:0,
  charm:0,
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
    partTimeJob:'jid',
    fullTimeJob:'jid',
    freeLancer:'jid',
  }],
  acts:[{
    socialize:'aid',
    exercise:'aid',
    skillLearning:'aid',
  }],
  beginLearnignCurrentSkillWeek :0,
  skills:[],
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
  changeJob:()=>{},
  quitJob:()=>{},
  changeAct:()=>{},
  quitAct:()=>{},
  getJobByJobType: ()=>{},
  earnMoney:()=>{},
  getJobById:()=>{},
  getActByActType: ()=>{},
  getActById:()=>{},
  gainActBenefit:()=>{},
  gainSkill:()=>{},
  setBeginLearnignCurrentSkillWeek:()=>{}
});

const StatContextProvider = ({ children }) => {
    const [week, setWeek] = useState(0); 
    const [stage, setStage] = useState(1);
    const [health, setHealth] = useState(100);
    const [energy, setEnergy] = useState(100);
    const [money, setMoney] = useState(900000000000000);
    const [charm, setCharm] = useState(0);
    const [skills, setSkills] = useState([]);
    const [beginLearnignCurrentSkillWeek,setbeginLearnignCurrentSkillWeek] = useState(0);
    const [subjectCredits, setSubjectCredits] = useState({
      math: 0,
      science: 0,
      social: 0,
      language: 0,
      art: 0,
    });
    const [careerPath,setCareerPath]= useState('');
    const [jobs, setJobs] = useState({
      partTimeJob:'',
      fullTimeJob:'',
      freeLancer:'',
    });
    const [acts, setActs] = useState({
      socialize:'',
      exercise:'',
      skillLearning:'',
    });
    const setBeginLearnignCurrentSkillWeek=()=>{
      setBeginLearnignCurrentSkillWeek(week);
    }
    const determineCareerPath = (path) => {
      setCareerPath(path);
    };
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

    const changeJob = (jid, jobType) => {
      let updatedJobType = '';
      switch (jobType) {
        case 'Full-time':
          updatedJobType = 'fullTimeJob';
          break;
        case 'Part-time':
          updatedJobType = 'partTimeJob';
          break;
        case 'Freelancer':
          updatedJobType = 'freeLancer';
          break;
        default:
          break;
      }
      setJobs((prevJobs) => ({
        ...prevJobs,
        [updatedJobType]: jid,
      }));
    };
    const quitJob = (jobType) => {
      let updatedJobType = '';
      switch (jobType) {
        case 'Full-time':
          updatedJobType = 'fullTimeJob';
          break;
        case 'Part-time':
          updatedJobType = 'partTimeJob';
          break;
        case 'Freelancer':
          updatedJobType = 'freeLancer';
          break;
        default:
          break;
      }
      setJobs((prevJobs) => ({
        ...prevJobs,
        [updatedJobType]: '',
      }));
    };

    const getJobById = (jobId) => {
      const job = JOB_INFO.find((job) => job.jid === jobId);
      return job ? job : '';
    };
    const getJobByJobType = (jobType)=>{
      let currentJobId;
      if (jobType == 'Full-time'){
          currentJobId = jobs.fullTimeJob;
      } else if (jobType == 'Part-time'){
          currentJobId = jobs.partTimeJob;
      } else if (jobType == 'Freelancer'){
          currentJobId = jobs.freeLancer;
      }
      return getJobById(currentJobId);
    }
    const earnMoney =(salary, weeks)=>{
      
      setMoney(preMoney => preMoney + salary * weeks);
    }

    const changeAct = (aid, actType) => {
      let updatedActType = '';
      switch (actType) {
        case 'Socialize':
          updatedActType = 'socialize';
          break;
        case 'Exercise':
          updatedActType = 'exercise';
          break;
        case 'Skill':
          updatedActType = 'skillLearning';
          break;
        default:
          break;
      }
      setActs((prevActs) => ({
        ...prevActs,
        [updatedActType]: aid,
      }));
    };
    const quitAct = (actType) => {
      let updatedActType = '';
      switch (actType) {
        case 'Socialize':
          updatedActType = 'socialize';
          break;
        case 'Exercise':
          updatedActType = 'exercise';
          break;
        case 'Skill':
          updatedActType = 'skillLearning';
          break;
        default:
          break;
      }
      setActs((prevActs) => ({
        ...prevActs,
        [updatedActType]: '',
      }));
    };

    const getActById = (actId) => {
      const act = ACT_INFO.find((act) => act.aid === actId);
      return act ? act : '';
    };
    const getActByActType = (actType)=>{
      let currentActId = '';
      switch (actType) {
        case 'Socialize':
          currentActId = acts.socialize;
          break;
        case 'Exercise':
          currentActId = acts.exercise;
          break;
        case 'Skill':
          currentActId = acts.skillLearning;
          break;
        default:
          break;
      }
      return getActById(currentActId);
    }
    const gainActBenefit = () => {
      if (acts.socialize) {
        const socializeAct = getActById(acts.socialize);
        setCharm((prevCharm) => prevCharm + socializeAct.behavior);
      }
      if (acts.exercise) {
        const exerciseAct = getActById(acts.exercise);
        setHealth((prevHealth) => prevHealth + exerciseAct.behavior);
      }
    };
    const gainSkill = (weeks) => {
      const skillLearningAct = getActById(acts.skillLearning);
    
      if (skillLearningAct) {
        const currentSkillDuration = skillLearningAct.behavior;
        const finishLearningCurrentSkillWeek = currentSkillDuration + beginLearnignCurrentSkillWeek;
        const isSkillLearned = week + weeks >= finishLearningCurrentSkillWeek;
        if (isSkillLearned) {
          const learnedSkillName = skillLearningAct.actName;
          setSkills((prevSkills) => [...prevSkills, learnedSkillName]);
        }
      }
    };
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
      setMoney(0);
      setCharm(0);
      setSubjectCredits({
        math: 0,
        science: 0,
        social: 0,
        language: 0,
        art: 0,
      });
      determineCareerPath('');
      setJobs({
        partTimeJob:'',
        fullTimeJob:'',
        freeLancer:'',
      });
      setActs ({
        socialize:'',
        exercise:'',
        skillLearning:'',
      });
      setSkills([]);
    }
    const value = {
      week:week,
      age:0,
      stage:stage,
      health:health,
      energy:energy,
      money:money,
      charm:charm,
      subjectCredits:subjectCredits,
      jobs:jobs,
      acts:acts,
      careerPath:careerPath,
      skills:skills,
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
      changeJob:changeJob,
      quitJob:quitJob,
      earnMoney:earnMoney,
      getJobById:getJobById,
      getJobByJobType:getJobByJobType,
      changeAct:changeAct,
      quitAct:quitAct,
      getActByActType:getActByActType,
      getActById:getActById,
      gainActBenefit:gainActBenefit,
      gainSkill:gainSkill,
      setBeginLearnignCurrentSkillWeek:setBeginLearnignCurrentSkillWeek,
    };
    return (
      <StatContext.Provider value={value}>
        {children}
      </StatContext.Provider>
    );
  };

export default StatContextProvider;