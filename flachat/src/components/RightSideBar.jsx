import { useContext } from 'react';
import '../css/right-sidebar.css';
import { Context } from '../Context/Context';
import { users } from '../data/data';
import { Link } from 'react-router-dom';
import Search from './Search';
import ProfileBar from './ProfileBar';
export default function SideBar() {
  const { setShow } = useContext(Context);

  const Click = () => {
    setShow(true);
  };

  return (
    <>
      <div className="right-sidebar">
        <div className="right-sidebar-header-mode">
          <span>Mode</span>
          <div className="mode">
            <div className="mode-light"></div>
            <div className="mode-dark"></div>
          </div>
        </div>
        <ProfileBar />
        <div className="sidebar-header">
          <h2>Profile</h2>
        </div>
        <Search />
        <div className="users">
          {users.map((user) => (
            <Link
              to={`/profile/${user.id}`}
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
