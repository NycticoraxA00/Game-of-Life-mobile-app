import React, { createContext, useContext, useState } from 'react';
import { LogContext } from './log-context';
import { StatContext } from './stat-context';

export const SubjectContext = createContext({
  math: 0,
  science: 0,
  social: 0,
  language: 0,
  art: 0,
  changeSubjectEnergy: () => {},
  getSubjectEnergy:()=>{},
  resetGame:()=>{}
});

const SubjectContextProvider = ({ children }) => {

  const [subjectEnergy, setSubjectEnergy] = useState({
    math: 0,
    science: 0,
    social: 0,
    language: 0,
    art: 0,
  });

  const changeSubjectEnergy = (subject, energy) => {
    setSubjectEnergy((prevEnergy) => ({
      ...prevEnergy,
      [subject]: energy,
    }));
    
  };

  const getSubjectEnergy = (subject)=>{
    return subjectEnergy[subject];
  }

  const resetGame = ()=>{
    setSubjectEnergy({
        math: 0,
        science: 0,
        social: 0,
        language: 0,
        art: 0,
    })
  }
  const value = {
    ...subjectEnergy,
    changeSubjectEnergy: changeSubjectEnergy,
    getSubjectEnergy:getSubjectEnergy,
    resetGame:resetGame,
  };

  return (
    <SubjectContext.Provider value={value}>
      {children}
    </SubjectContext.Provider>
  );
};

export default SubjectContextProvider;