import { useContext } from 'react';
import '../css/left-sidebar.css';
import { Context } from '../Context/Context';
import { users } from '../data/data';
import { Link } from 'react-router-dom';
import Search from '../components/Search';
import MenuIcon from '@mui/icons-material/Menu';
// import ClearIcon from '@mui/icons-material/Clear';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export default function LeftSideBar() {
  const { show, setShow, setShowMenu } = useContext(Context);

  const Click = () => {
    setShow(true);
  };

  return (
    <>
      <div className={!show ? 'sidebar' : ' hide-sidebar'} >
        <div className="sidebar-header">
          <h2>Chats</h2>
          <MenuIcon className="icon" onClick={() => setShowMenu(true)} />
        </div>
        <div className="sidebar-top">
          <span>Active</span>
          <span>Group</span>
          <span>Message request</span>
        </div>
        <Search />
        <div className="users">
          {users.map((user) => (
            <Link
              to={`/message/${user.id}`}
              key={user.id}
              className="user"
              onClick={Click}
            >
              <img className="img" src={user.avatar} alt={user.name} />
              <span>{user.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
