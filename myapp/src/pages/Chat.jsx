import ChatBox from '../components/ChatBox';
import './chat.css';
import Avatar from '../components/Avatar';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import io from 'socket.io-client';

function Chat() {
  const { user, socket, setSocket, users, setUsers } = useContext(UserContext);

  console.log(user);

  useEffect(() => {
    setSocket(io('http://localhost:3000'));
  }, [setSocket]);

  useEffect(() => {
    socket?.emit('send_user', user?.userId);
  }, [socket, user]);

  useEffect(() => {
    const GetUsers = async () => {
      await axios.get('/user/users').then((res) => {
        setUsers(res.data);
      });
    };
    GetUsers();
  }, [setUsers]);
  const newUser = users?.filter((u) => {
    return u?._id !== user?.userId;
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  return (
    <>
      <div className="users">
        <div className="user__controller">
          <div className="user__lists">
            {newUser?.map((item, index) => (
              <Avatar {...item} key={index} />
            ))}
          </div>
          <ChatBox />
        </div>
      </div>
    </>
  );
}

export default Chat;
