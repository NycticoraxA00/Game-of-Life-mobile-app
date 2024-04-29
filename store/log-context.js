import React, { createContext, useEffect, useState } from 'react';

export const LogContext = createContext({
    actionLogs:[],
    statsChangeLogs:[],
    detectAction:()=>{},
    clearLogs:()=>{},
    addNewStatChangeLog:()=>{},
});

const LogContextProvider = ({ children }) => {
    const [actionLogs, setActionLogs] = useState([]);
    const [statsChangeLogs, setStatChangeLogs] = useState([]);
    const detectAction = (action,object)=>{
      const newActionLogEntry = {
          action:action,
          object:object,
      };
      setActionLogs([...actionLogs,newActionLogEntry]);        
    };
    const addNewStatChangeLog = (change, object) => {
      setStatChangeLogs((prevLogs) => [...prevLogs, { change, object }]);
    };
    const clearLogs=()=>{
      setActionLogs([]);
      setStatChangeLogs([]);
    }
    const value = {
      actionLogs:actionLogs,
      statsChangeLogs:statsChangeLogs,
      detectAction:detectAction,
      clearLogs:clearLogs,
      addNewStatChangeLog:addNewStatChangeLog
    };
    return (
      <LogContext.Provider value={value}>
        {children}
      </LogContext.Provider>
    );
  };

export default LogContextProvider;