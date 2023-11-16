import './chatContainer.css';
import ChatBox from '../components/ChatBox';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { createSvgIcon } from '@mui/material/utils';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import MenuIcon from '@mui/icons-material/Menu';
import Profile from '../pages/Profile';
function ChatContainer() {
  const [queryFriend, setQueryFriend] = useState('');
  const [queryChat, setQueryChat] = useState('');
  const [isProfile, setIsProfile] = useState(false);

  const {
    users,
    user,
    conMembers,
    setConMembers,
    conversation,
    setConversation,
    setConversationId,
    receivedData,
  } = useContext(UserContext);
  const { id, username, userId } = useParams();
  console.log(id);
  console.log(username);
  console.log(userId);
  console.log(conversation);
  console.log(conMembers);

  const Logout = () => {
    axios.post('/logout').then(() => {
      window.location.reload();
    });
  };
  useEffect(() => {
    const GetConversation = async () => {
      await axios.get('/conversations/' + id).then((res) => {
        setConversation(res.data);
        setConversationId(
          res.data?.find(
            (conversation) =>
              conversation?.members?.includes(user?.userId) &&
              conversation?.members?.includes(id)
          )?._id
        );
      });
    };
    GetConversation();
  }, [id, setConversation, setConversationId, user?.userId]);

  // get users from conversation member
  let userMembers = [];
  conMembers?.map((c) => {
    return users?.filter(
      (u) => u?._id === c?.members.find((m) => m !== user?.userId)
    )[0]
      ? userMembers.push(
          users?.filter(
            (u) => u?._id === c?.members.find((m) => m !== user?.userId)
          )[0]
        )
      : null;
  });

  const searchChat = userMembers?.filter((u) => {
    return u.username.toLowerCase().includes(queryChat?.toLowerCase());
  });
  console.log(searchChat);
  useEffect(() => {
    const GetConversationByUserId = async () => {
      await axios.get('/conversations/' + user?.userId).then((res) => {
        setConMembers(res.data);
      });
    };
    GetConversationByUserId();
  }, [setConMembers, user?.userId]);

  const contact = users?.filter((u) => {
    return u._id !== user?.userId;
  });
  console.log(contact);

  const searchUser = contact?.filter((u) => {
    return u.username.toLowerCase().includes(queryFriend?.toLowerCase());
  });

  const [svgImg, setSvgImage] = useState('');
  useEffect(() => {
    let r = (Math.random() + 1).toString(36).substring(7);
    let avatarId = r;
    fetch('https://api.multiavatar.com/' + JSON.stringify(avatarId))
      .then((res) => res.text())
      .then((svg) => setSvgImage(svg));
  }, []);

  const PlusIcon = createSvgIcon(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>,
    'Plus'
  );

  return (
    <>
      <div className="chatContainer">
        <div className="contacts">
          <div className="contactsHeader">
            <ElectricBoltIcon />
            <Link
              to="/home"
              className="link"
              onClick={() => {
                setIsProfile(false);
              }}
            >
              <h2>Chats</h2>
            </Link>
            {searchChat.length > 0 ? (
              <input
                className="search-chat"
                type="text"
                placeholder="search a chat"
                onChange={(ev) => setQueryChat(ev.target.value)}
              />
            ) : null}
            <div className="addContact">
              <PlusIcon color="primary" />
            </div>
          </div>
          <div className="contact-list">
            {searchChat?.length > 0 ? (
              searchChat?.map((contact) => (
                <Link
                  to={`/${contact?._id}`}
                  key={contact?._id}
                  className="contact"
                  onClick={() => setIsProfile(false)}
                >
                  {contact?.profilePicture ? (
                    <img src={contact?.profilePicture} alt="" />
                  ) : (
                    <h3 className="profile-Text">{contact?.username[0]}</h3>
                  )}
                  <div className="meta">
                    <p>{contact?.username}</p>
                    <p>
                      {
                        receivedData?.filter(
                          (data) =>
                            data?.senderId === contact?._id ||
                            data?.receiverId === contact?._id
                        )[receivedData.length - 1]?.messageText
                      }
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="noChat">
                <span>
                  You have no any conversation yet.
                  <br /> Start a conversation with your friends
                </span>
              </div>
            )}
          </div>
          <div className="options">
            <button>Mutuals</button>
            <button>Groups</button>
            <button>Friends</button>
          </div>
        </div>
        <div className="chatBox">
          {isProfile ? (
            <Profile username={username} searchChat={searchChat} />
          ) : (
            <ChatBox isProfile={isProfile} />
          )}
        </div>
        <div className="GroupChat">
          <div className="contacts">
            <div className="profile">
              <div className="profile-left">
                <span>Profile</span>
                {user?.userProfile ? (
                  <img src={user?.userProfile} alt="" />
                ) : (
                  <div
                    className="avatar"
                    dangerouslySetInnerHTML={{ __html: svgImg }}
                    style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      margin: '10px',
                    }}
                  ></div>
                )}
                <span>{user?.username}</span>
              </div>
              <MenuIcon className="menuIcon" />
            </div>

            <div className="contactsHeader">
              <h2>Logged in users</h2>
            </div>
            <input
              className="searchInput"
              type="text"
              placeholder="search for chats"
              onChange={(ev) => setQueryFriend(ev.target.value)}
            />
            <div className="contact-list">
              {searchUser?.map((contact) => (
                <Link
                  to={`/${contact?.username}/${contact?._id}`}
                  key={contact?._id}
                  className="contact"
                  onClick={() => {
                    setIsProfile(true);
                  }}
                >
                  <span className={`contact-status ${contact.status}`}></span>
                  {contact?.profilePicture ? (
                    <img src={contact.profilePicture} alt="" />
                  ) : (
                    <h3 className="profile-Text">{contact?.username[0]}</h3>
                  )}
                  <div className="meta">
                    <p className="name">{contact?.username}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="logout">
            <button onClick={Logout}>LOGOUT</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatContainer;
