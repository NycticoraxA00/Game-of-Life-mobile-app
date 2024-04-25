import React from "react";
import AuthContextProvider from "./auth-context";
import StatContextProvider from "./stat-context";
import LogContextProvider from "./log-context";
import SubjectContextProvider, { SubjectContext } from "./subject-context";

export const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  return (
    <AuthContextProvider>
      <StatContextProvider>
        <SubjectContextProvider>
          <LogContextProvider>
            {children}
          </LogContextProvider>
        </SubjectContextProvider>
      </StatContextProvider>
    </AuthContextProvider>
  );
};

export default AppContextProvider;