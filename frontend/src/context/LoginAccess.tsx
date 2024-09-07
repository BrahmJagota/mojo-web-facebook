import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LoginAccessContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  pageAccessToken: string | null;
  setPageAccessToken: (token: string | null) => void;
}

const LoginAccessContext = createContext<LoginAccessContextType | undefined>(undefined);

export const LoginAccessProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
const [pageAccessToken, setPageAccessToken] = useState<string | null>(null);
  return (
    <LoginAccessContext.Provider value={{ accessToken, setAccessToken, pageAccessToken, setPageAccessToken }}>
      {children}
    </LoginAccessContext.Provider>
  );
};

export const useLoginAccess = () => {
  const context = useContext(LoginAccessContext);
  if (!context) {
    throw new Error('useLoginAccess must be used within a LoginAccessProvider');
  }
  return context;
};
