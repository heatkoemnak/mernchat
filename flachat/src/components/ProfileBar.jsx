import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SettingsIcon from '@mui/icons-material/Settings';
import '../css/profile-bar.css';

export default function ProfileBar() {
  return (
    <div className="profile-bar">
      <div className="profile-wrapper">
        <div className="profile-left">
          <img src="https://i.imgur.com/hczKIze.png" alt="user" />
          <div className="profile-right">
            <span>Jimin John</span>
            <KeyboardArrowDownIcon className="icon" />
            <span>+855 977304279</span>
            <div className="setting-icon">
              <SettingsIcon className="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
