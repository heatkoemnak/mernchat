import { Link } from 'react-router-dom';
import '../css/userList.css';
import { useContext } from 'react';
import { Context } from '../Context/Context';

export default function UserListLeft(users) {
  const { setShow } = useContext(Context);

  return (
    <>
      <div className="people">
        <h2>People</h2>
      </div>
      <div className="users">
        {users.users.map((user) => (
          <Link
            to={`/profile/${user.id}`}
            key={user.id}
            className="user"
            onClick={() => setShow(true)}
          >
            <img className="img" src={user.avatar} alt={user.name} />
            <span>{user.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
