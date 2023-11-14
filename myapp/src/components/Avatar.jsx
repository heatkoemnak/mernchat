import { Link } from 'react-router-dom';
import './avatar.css';

function Avatar(items) {
  return (
    <Link to={`/${items._id}`} className="avatar">
      <img
        src={items ? items.profilePicture : 'hello no profile'}
        alt="Avatar"
      />
      <div className="status">{items?.username}</div>
    </Link>
  );
}

export default Avatar;
