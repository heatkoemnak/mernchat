import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});
export const UserProvider = (children) => {
  const [user, setUser] = useState(null);
  // const [userId, setUserId] = useState(null);
  const [LoggedIn, setLoggedIn] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [getMessage, GetMessage] = useState([]);
  const [receivedData, setReceivedData] = useState([]);
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [conMembers, setConMembers] = useState(null);

  useEffect(() => {
    axios.get('/api/profile').then((res) => {
      if (res.data) {
        setUser(res.data);
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        setUser,
        setUsers,
        LoggedIn,
        setLoggedIn,
        userCreated,
        setUserCreated,
        getMessage,
        GetMessage,
        receivedData,
        setReceivedData,
        socket,
        setSocket,
        conversation,
        setConversation,
        conversationId,
        setConversationId,
        conMembers,
        setConMembers,
      }}
    >
      {children.children}
    </UserContext.Provider>
  );
};
