import React, { createContext, useEffect, useState } from 'react';

export const LogContext = createContext({
    actionLogs:()=>{},
    statChangeLogs:()=>{},
    detectAction:()=>{},
    detectStatChange:()=>{},
    clearLogs:()=>{},
});

const LogContextProvider = ({ children }) => {
    const [actionLogs, setActionLogs] = useState([]);
    const [statChangeLogs, setStatChangeLogs] = useState([]);

    const detectAction = (action,object,consequence)=>{
        const newActionLogEntry = {
            action:action,
            object:object,
            consequence:consequence,
        };
        setActionLogs([...actionLogs,newActionLogEntry]);        
    };
    const detectStatChange = (change,object)=>{
      const newStatChangeLogEntry = {
          change:change,
          object:object,
      };
      setStatChangeLogs([...statChangeLogs,newStatChangeLogEntry]);        
  };
    const clearLogs=()=>{
      setActionLogs([]);
      setStatChangeLogs([])
    }
    const value = {
      actionLogs:actionLogs,
      statChangeLogs:statChangeLogs,
      detectAction:detectAction,
      detectStatChange:detectStatChange,
      clearLogs:clearLogs,
    };
    return (
      <LogContext.Provider value={value}>
        {children}
      </LogContext.Provider>
    );
  };

export default LogContextProvider;