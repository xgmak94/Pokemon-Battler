import { useState, useEffect, useContext, createContext, useMemo } from 'react';

export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [accountInfo, setAccountInfo] = useState({
    username: '',
    password: '',
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const userInfo = useMemo(
    () => ({
      accountInfo,
      setAccountInfo,
      loggedIn,
      setLoggedIn,
    }),
    [accountInfo, loggedIn]
  );

  return (
    <>
      <LoginContext.Provider value={userInfo}>{children}</LoginContext.Provider>
    </>
  );
}
