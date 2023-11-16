import './profile.css';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Profile(username) {
  const { users, user } = useContext(UserContext);
  console.log(username);
  const userProfile = users?.find((u) => {
    return u.username === username.username;
  });
  const userAlreadyInContact = username?.searchChat?.find((u) => {
    return u.username === username.username;
  });
  console.log(userProfile);
  console.log(userAlreadyInContact);
  console.log(username?.searchChat);
  const createConversation = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post('/api/createCon', {
          senderId: user?.userId,
          receiverId: userProfile?._id,
        })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile">
      <h2> User Info</h2>
      <div className="profile-info">
        {userProfile?.profilePicture ? (
          <img src={userProfile?.profilePicture} alt="" />
        ) : (
          <span className="Profile-Text">{userProfile?.username[0]}</span>
        )}
        <div className="user-text">
          <div className="username">
            <Link className="link">
              <span>Username</span>
            </Link>
            <p>@ {userProfile?.username}</p>
          </div>
          <form className="addToChats" onSubmit={createConversation}>
            {!userAlreadyInContact ? (
              <button>ADD TO CHATS</button>
            ) : (
              <button>SEND MESSAGES</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
