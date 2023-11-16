import { useContext, useEffect } from 'react';
import ChatContainer from './ChatContainer';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Home from '../pages/Home';

function RoomChat() {
  const { user, setUsers } = useContext(UserContext);
  useEffect(() => {
    const GetUsers = async () => {
      await axios.get('/api/users').then((res) => {
        setUsers(res.data);
      });
    };
    GetUsers();
  }, [setUsers]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);
  return <>{user ? <ChatContainer /> : <Home />}</>;
}

export default RoomChat;
