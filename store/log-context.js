import React, { createContext, useEffect, useState } from 'react';

export const LogContext = createContext({
    log:[],
    detectAction:()=>{},
    clearLogs:()=>{},
});

const LogContextProvider = ({ children }) => {
    const [logs, setLogs] = useState([]);

    const detectAction = (action,object,consequence)=>{
        const newLogEntry = {
            action:action,
            object:object,
            consequence:consequence,
        };
        setLogs([...logs,newLogEntry]);        
    };
    const clearLogs=()=>{
        setLogs([]);
    }
    const value = {
      log:logs,
      detectAction:detectAction,
      clearLogs:clearLogs,
    };
    return (
      <LogContext.Provider value={value}>
        {children}
      </LogContext.Provider>
    );
  };

export default LogContextProvider;