import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import SettingsIcon from '@mui/icons-material/Settings';
import '../css/profile-bar.css';
import { useContext } from 'react';
import { Context } from '../Context/Context';

export default function ProfileBar() {
  const { user, userName, userProfile, showAccount, setShowAccount } =
    useContext(Context);
  return (
    <div className="profile-bar">
      <div className="switch-mode">
        <div className="mode-left">
          <span>Mode</span>
        </div>
        <div className="mode-right">
          <div className="mode-light"></div>
          <div className="mode-dark"></div>
        </div>
      </div>
      <div className="profile-wrapper">
        <div className="profile-left">
          <img
            src={userProfile ? userProfile : 'https://i.imgur.com/hczKIze.png'}
            alt=""
          />
          <div className="profile-right">
            <span>{user?.username || userName}</span>
            {!showAccount ? (
              <KeyboardArrowDownIcon
                className="icon"
                onClick={() => setShowAccount(true)}
              />
            ) : (
              <KeyboardArrowUpIcon
                className="icon"
                onClick={() => setShowAccount(false)}
              />
            )}
            <span className="phone">{user?.phoneNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
