import { useContext } from 'react';
import './headerChat.css';
import { UserContext } from '../Context/UserContext';
import { Link } from 'react-router-dom';
import ForumIcon from '@mui/icons-material/Forum';

function Header() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <>
      <div className="headerChat">
        <div className="headerContainer">
          <Link to="/" className="link">
            <ForumIcon />
            <h2 className="logo">MernChat</h2>
          </Link>
          Logged in as {user?.username}
          {/* <input
            className="input"
            type="text"
            placeholder="search conversation"
          /> */}
          <div className="profile">
            {user ? (
              <img
                src={
                  user
                    ? user.userProfile
                    : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
                }
                alt=""
              />
            ) : (
              <img
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                alt=""
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
