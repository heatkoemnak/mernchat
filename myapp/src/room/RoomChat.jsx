import { useContext, useEffect } from 'react';
import ChatContainer from './ChatContainer';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import Home from '../pages/Home';

function RoomChat() {
  const { user, setUsers, setLoggedIn } = useContext(UserContext);
  useEffect(() => {
    const GetUsers = async () => {
      await axios.get('/api/users').then((res) => {
        setUsers(res.data);
      });
    };
    GetUsers();
  }, [setUsers]);
  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    }
  }, [setLoggedIn, user]);
  return <>{user ? <ChatContainer /> : <Home />}</>;
}

export default RoomChat;
