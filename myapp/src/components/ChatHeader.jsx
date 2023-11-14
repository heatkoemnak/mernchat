import './chatHeader.css';
import ForumIcon from '@mui/icons-material/Forum';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
const ChatHeader = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="header">
      <div className="header__left">
        <h2>
          <ForumIcon />
          Mern Chat
        </h2>
      </div>
      <div className="search__conversation">
        <input type="text" placeholder="search username or conversation ..." />
      </div>
      <div className="chat__icon">
        <img
          src={
            user
              ? user?.userProfile
              : 'https://play-lh.googleusercontent.com/G1jalUvzKDBMEwP2iYSjWZKVwwN0WHJpFyzh9DOo-Jlnwclqft37T88w4DRMjpLD3ls=w600-h300-pc0xffffff-pd'
          }
          alt=""
        />
        <DehazeIcon />
      </div>
    </div>
  );
};

export default ChatHeader;
