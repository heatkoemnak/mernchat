import { Outlet, useNavigate } from 'react-router-dom';
import '../css/root.css';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import { useContext, useEffect } from 'react';
import { Context } from '../Context/Context';
// import ClearIcon from '@mui/icons-material/Clear';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ProfileBar from './ProfileBar';
import Search from './Search';
import axios from 'axios';
export default function Root() {
  const {
    user,
    showAccount,
    showMenu,
    setShowMenu,
    setUserName,
    setUseProfile,
  } = useContext(Context);

  const history = useNavigate();
  useEffect(() => {
    if (!user) {
      history('/login');
    }
  }, [history, user]);

  useEffect(() => {
    if (
      localStorage.getItem('user') &&
      localStorage.getItem('profile') !== null
    ) {
      setUserName(localStorage.getItem('user'));
      setUseProfile(localStorage.getItem('profile'));
    }
  }, [setUseProfile, setUserName]);

  const Logout = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    axios
      .post('/api/logout')
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="root">
        <div
          className={showMenu ? 'filter-bg' : null}
          onClick={() => setShowMenu(!showMenu)}
        ></div>
        <div className={showMenu ? 'overlay' : 'hide-overlay'}>
          <div className="menu-header">
            <ProfileBar />
            {showAccount ? (
              <div className="accounts">
                <div className="account">Account</div>
                <span>Add Account</span>
              </div>
            ) : null}
            <div className="options">
              <div className="option-contact">
                <AccountCircleIcon className="icon" />
                <span>New Contact</span>
              </div>
              <div className="option-contact">
                <SupervisedUserCircleIcon className="icon" />
                <span>New Group</span>
              </div>
            </div>
            <Search />
          </div>
          <div className="menu-bottom">
            <div className="setting">
              <SettingsIcon className="icon" />
              <span>Settings</span>
            </div>
            <div className="logout" onClick={Logout}>
              <div className="logout-txt">Log out</div>
              <ExitToAppIcon className="icon" />
            </div>
          </div>
        </div>
        <LeftSideBar />
        <Outlet />
        <RightSideBar />
      </div>
    </>
  );
}
