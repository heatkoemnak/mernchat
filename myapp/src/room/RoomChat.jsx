import { useContext, useEffect } from 'react';
import ChatContainer from './ChatContainer';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import Home from '../pages/Home';

function RoomChat() {
  const { setUsers, LoggedIn } = useContext(UserContext);
  const GetUsers = async () => {
    const res = await axios.get('/api/users');
    setUsers(res.data);
  };
  useEffect(() => {
    GetUsers();
  });
  return <>{LoggedIn ? <ChatContainer /> : <Home />}</>;
}

export default RoomChat;
