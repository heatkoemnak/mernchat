import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import './chatBox.css';
import { UserContext } from '../Context/UserContext';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import InputEmoji from 'react-input-emoji';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MoreVertIcon from '@mui/icons-material/MoreVert';
function ChatBox() {
  const [message, setMessage] = useState('');
  const { user, socket, users, receivedData, setReceivedData, conversationId } =
    useContext(UserContext);

  const { id } = useParams();

  const inCon = users?.find((u) => {
    return u._id === id;
  });

  console.log(inCon);
  function handleOnEnter(message) {
    console.log(message);
  }

  useEffect(() => {
    const scroll = document.querySelector('.message-list');
    scroll?.scrollTo(0, scroll.scrollHeight);
  }, [receivedData]);

  useEffect(() => {
    const GetMessages = async () => {
      await axios.get('/api/messages/' + conversationId).then((res) => {
        setReceivedData(res.data);
      });
    };
    GetMessages();
  }, [setReceivedData, conversationId]);

  const sendMessage = async (ev) => {
    ev.preventDefault();
    let dataToSend = {
      conversationId: conversationId,
      senderId: user.userId,
      senderName: user.username,
      messageText: message,
      profilePicture: user.userProfile,
      receiverId: id,
      time: moment().format('LT'),
    };
    try {
      await axios.post('/api/send_message', dataToSend).then((res) => {
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    socket?.emit('send_message', {
      conversationId: conversationId,
      senderId: user.userId,
      senderName: user.username,
      messageText: message,
      profilePicture: user.userProfile,
      receiverId: id,
      time: moment().format('LT'),
    });
    setReceivedData((prev) => [
      ...prev,
      {
        conversationId: conversationId,
        senderId: user.userId,
        senderName: user.username,
        messageText: message,
        profilePicture: user.userProfile,
        receiverId: id,
        time: moment().format('LT'),
      },
    ]);
    setMessage('');
  };

  useEffect(() => {
    socket?.on('receive_message', (data) => {
      console.log(data);
      setReceivedData((prev) => [...prev, data]);
    });
  }, [socket, setReceivedData]);

  return (
    <div className="chat__box">
      {conversationId && (
        <div className="chat__box__header">
          <div className="chat__box__left">
            {inCon ? (
              <Link to="/chat" className="link">
                <KeyboardBackspaceIcon />
              </Link>
            ) : null}
            {inCon?.profilePicture ? (
              <img src={inCon?.profilePicture} alt="" />
            ) : (
              <span>{inCon?.username[0]}</span>
            )}
            <p>{inCon?.username}</p>
          </div>
          {inCon ? (
            <span className="active">
              <MoreVertIcon />
            </span>
          ) : null}
        </div>
      )}

      <div className="message-list">
        {conversationId == undefined ? (
          <ConUndefined />
        ) : (
          <>
            {receivedData?.map((m) => (
              <div
                className={
                  m?.senderId == user?.userId ? 'message own' : 'message'
                }
                key={m?._id}
              >
                <div className="message__top">
                  {m?.senderId !== user?.userId ? (
                    m?.profilePicture ? (
                      <img src={m?.profilePicture} alt="" />
                    ) : (
                      <span className="profile-Text">{m?.senderName[0]}</span>
                    )
                  ) : null}
                  <p className="messageText">{m?.messageText}</p>
                </div>
                <span className="time">{m?.time}</span>
              </div>
            ))}
          </>
        )}
      </div>
      {conversationId === undefined ? null : (
        <div className="chat__box__footer">
          {user?.userProfile ? (
            <img src={user?.userProfile} alt="" />
          ) : (
            <span>{user?.username[0]}</span>
          )}
          <InputEmoji
            value={message}
            onChange={setMessage}
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder="Type a message"
          />
          <button type="submit" className="span" onClick={sendMessage}>
            Send
          </button>
        </div>
      )}
    </div>
  );
}
export const ConUndefined = () => {
  return (
    <div className="if-null">
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <img
        src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/336998005/original/9d91e57d1cbdb0c4445acc42af554de6eb650615/design-illustrated-gifts-for-you-just-as-you-need.jpg"
        alt=""
      />
      <span>Welcome to FlaChat</span>
      <p className="select-message">Select a chat to start conversation</p>
    </div>
  );
};

export default ChatBox;
