import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const Context = createContext({});
export const ContextProvider = (children) => {
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userProfile, setUseProfile] = useState(null);
  const [showAccount, setShowAccount] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get('/api/profile')
      .then((res) => {
        if (res.data) {
          setUser(res.data);
          setLoggedIn(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Context.Provider
      value={{
        userName,
        setUserName,
        userProfile,
        setUseProfile,
        show,
        setShow,
        showMenu,
        setShowMenu,
        showAccount,
        setShowAccount,
        loggedIn,
        setLoggedIn,
        user,
        setUser,
      }}
    >
      {children.children}
    </Context.Provider>
  );
};
