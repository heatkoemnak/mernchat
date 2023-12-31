import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import axios from 'axios';
import Register from './pages/Register';
// import Room from './pages/Room';
// import Chat from './pages/Chat';
import RoomChat from './room/RoomChat';
import { useContext, useEffect } from 'react';
import io from 'socket.io-client';
import { UserContext } from './Context/UserContext';
import Home from './pages/Home';

// import HeaderChat from './room/HeaderChat';

axios.defaults.baseURL =
  'https://backenddeploy.vercel.app' || 'http://localhost:8000';
axios.defaults.withCredentials = true;
function App() {
  const { socket, user, setSocket } = useContext(UserContext);
  console.log(user);
  useEffect(() => {
    setSocket(
      io('https://backenddeploy.vercel.app' || 'http://localhost:8000')
    );
  }, [setSocket]);
  useEffect(() => {
    socket?.emit('send_user', user?.userId);
  }, [socket, user?.userId]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/chat" exact element={<RoomChat />} />
          <Route path="/:id" element={<RoomChat />} />
          <Route path="/:username/:userId" element={<RoomChat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
