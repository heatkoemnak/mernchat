import { useContext } from 'react';
import '../css/left-sidebar.css';
import { Context } from '../Context/Context';
import { users } from '../data/data';
import Search from '../components/Search';
import MenuIcon from '@mui/icons-material/Menu';
import UserListLeft from './UserListLeft';
export default function LeftSideBar() {
  const { show, setShowMenu } = useContext(Context);

  return (
    <>
      <div className={!show ? 'sidebar' : ' hide-sidebar'}>
        <div className="sidebar-header">
          <h2>Chats</h2>
          <MenuIcon className="icon" onClick={() => setShowMenu(true)} />
        </div>
        <Search />
       
        <div className="sidebar-top">
          <span>Group</span>
          <span>Message request</span>
        </div>
        <UserListLeft users={users} />
      </div>
    </>
  );
}
