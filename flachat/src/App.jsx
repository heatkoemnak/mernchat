import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Root from './components/Root';
import Profile from './pages/Profile';
import ChatContent from './components/ChatContent';
import Empty from './pages/Empty';
// import SideBar from './components/SideBar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="message/:id" element={<ChatContent />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="/" element={<Empty />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
