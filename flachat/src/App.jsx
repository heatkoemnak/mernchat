import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Root from './components/Root';
import Profile from './pages/Profile';
import ChatContent from './components/ChatContent';
import Empty from './pages/Empty';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="message/:id" element={<ChatContent />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/" element={<Empty />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
