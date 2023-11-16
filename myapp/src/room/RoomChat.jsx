import { useContext, useEffect } from 'react';
import ChatContainer from './ChatContainer';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import Home from '../pages/Home';

function RoomChat() {
  const { setUsers, LoggedIn } = useContext(UserContext);

  useEffect(() => {
    const GetUsers = async () => {
      await axios.get('/api/users').then((err, result) => {
        if (err) {
          console.log(err);
        }
        setUsers(result.data);
      });
    };
    GetUsers();
  }, [setUsers]);
  return <>{LoggedIn ? <ChatContainer /> : <Home />}</>;
}

export default RoomChat;
