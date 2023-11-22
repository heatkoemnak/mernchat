import { Link, useParams } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InputEmoji from 'react-input-emoji';
import SendIcon from '@mui/icons-material/Send';
import PhotoIcon from '@mui/icons-material/Photo';
import '../css/chat-content.css';
import { users } from '../data/data';
import { useContext, useState } from 'react';
import { Context } from '../Context/Context';
export default function ChatContent() {
  const { show, setShow, setShowMenu } = useContext(Context);
  const [message, setMessage] = useState('');

  const { id } = useParams();
  console.log(id);
  const Click = () => {
    setShow(!show);
    setShowMenu(false);
  };

  function handleOnEnter(message) {
    console.log(message);
  }

  const user = users.find((u) => u.id == id);

  return (
    <>
      <div className="chat-content">
        <div className="chat-header">
          <div className="chat-header-left">
            <Link to="/" className="icon" onClick={Click}>
              <KeyboardBackspaceIcon />
            </Link>
            <img src={user.avatar} alt="avatar" />
            <div className="chat-header-name">{user.name}</div>
          </div>
          <div className="chat-header-right">
            <MoreVertIcon />
          </div>
        </div>
        <div className="chat-body">
          <div className="chat-message">
            <div className="message own">
              <div className="message-text">Hello</div>
              <div className="message-time">12:00</div>
            </div>
            <div className="message">
              <img src="https://i.imgur.com/hczKIze.png" alt="" />
              <div className="message-text">How are you?</div>
              <div className="message-time">12:00</div>
            </div>
            <div className="message own">
              <div className="message-text"> I am good.?</div>
              <div className="message-time">12:30</div>
            </div>
          </div>
        </div>
        <div className="chat-footer">
          <img src="https://i.imgur.com/hczKIze.png" alt="user" />
          <div className="input">
            <InputEmoji
              value={message}
              onChange={setMessage}
              cleanOnEnter
              onEnter={handleOnEnter}
              height={20}
              placeholder="Type a message"
            />
          </div>
          <button className="photo">
            <PhotoIcon className="Icon" />
          </button>
          <button className="send">
            Send
            <SendIcon className="icon" />
          </button>
        </div>
      </div>
    </>
  );
}
