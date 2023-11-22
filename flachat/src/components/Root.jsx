import { Outlet } from 'react-router-dom';
import '../css/root.css';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import { useContext } from 'react';
import { Context } from '../Context/Context';
// import ClearIcon from '@mui/icons-material/Clear';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ProfileBar from './ProfileBar';
import Search from './Search';
export default function Root() {
  const { showMenu, setShowMenu } = useContext(Context);

  return (
    <>
      <div className="root">
        <div
          className={showMenu ? 'filter-bg' : null}
          onClick={() => setShowMenu(false)}
        ></div>
        <div className={showMenu ? 'overlay' : 'hide-overlay'}>
          <div className="menu-header">
            <ProfileBar />
            <Search />
          </div>
        </div>
        <LeftSideBar />
        <Outlet />
        <RightSideBar />
      </div>
    </>
  );
}
