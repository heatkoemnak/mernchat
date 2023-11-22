import { createContext, useState } from 'react';

export const Context = createContext({});
export const ContextProvider = (children) => {
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);


  return (
    <Context.Provider
      value={{
        show,
        setShow,
        showMenu, setShowMenu
      }}
    >
      {children.children}
    </Context.Provider>
  );
};
