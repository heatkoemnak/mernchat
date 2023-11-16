import { Outlet } from 'react-router-dom';
import ChatHeader from '../components/ChatHeader';
import Button from '@mui/material/Button';
import './room.css';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
function Room() {
  const Logout = () => {
    axios.post('/api/logout').then(() => {
      window.location.reload();
    });
  };
  const { users } = useContext(UserContext);

  return (
    <>
      <ChatHeader />
      <Outlet />
      <div className="bottom">
        <div className="bottom__left">
          <Button variant="contained" color="success" onClick={Logout}>
            Logout
          </Button>
          <span>Admin</span>
        </div>
        <div className="bottom__left">
          <span>{users?.length} Conversations</span>
        </div>
      </div>
    </>
  );
}

export default Room;
