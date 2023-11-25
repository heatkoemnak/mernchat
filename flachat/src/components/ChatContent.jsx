import { Link, useParams } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InputEmoji from 'react-input-emoji';
import SendIcon from '@mui/icons-material/Send';
import '../css/chat-content.css';
import { users } from '../data/data';
import { useContext, useState } from 'react';
import { Context } from '../Context/Context';
export default function ChatContent() {
  const { show, userProfile, setShow, setShowMenu } = useContext(Context);
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
      <div
        className="chat-content"
        style={{ backgroundImage: `url(https://cdn.wallpapersafari.com/39/66/Nkoz53.jpg)` }}
      >
        <img
          className="bg-chat"
          src="https://cdn.wallpapersafari.com/39/66/Nkoz53.jpg"
          alt=""
        />
        <div className="chat-header">
          <div className="chat-header-left">
            <Link to="/" onClick={Click}>
              <KeyboardBackspaceIcon className="icon" />
            </Link>
            <img src={user.avatar} alt="avatar" />
            <span className="name">{user.name}</span>
          </div>
          <div className="chat-header-right">
            <MoreVertIcon className="icon" />
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
            <div className="message own">
              <div className="message-text"> I am good.?</div>
              <div className="message-time">12:30</div>
            </div>
            <div className="message own">
              <div className="message-text"> I am good.?</div>
              <div className="message-time">12:30</div>
            </div>
            <div className="message own">
              <div className="message-text"> I am good.?</div>
              <div className="message-time">12:30</div>
            </div>
            <div className="message own">
              <div className="message-text"> I am good.?</div>
              <div className="message-time">12:30</div>
            </div>
            <div className="message own">
              <div className="message-text"> I am good.?</div>
              <div className="message-time">12:30</div>
            </div>
            <div className="message own">
              <div className="message-text"> I am good.?</div>
              <div className="message-time">12:30</div>
            </div>
            <div className="message own">
              <div className="message-text"> I am good.?</div>
              <div className="message-time">12:30</div>
            </div>
            <div className="message own">
              <div className="message-text"> I am good.?</div>
              <div className="message-time">12:30</div>
            </div>
            <div className="message own">
              <div className="message-text"> I am good.?</div>
              <div className="message-time">12:30</div>
            </div>
            <div className="message own">
              <div className="message-text"> I am good.?</div>
              <div className="message-time">12:30</div>
            </div>
            <div className="message own">
              <div className="message-text"> I am good.?</div>
              <div className="message-time">12:30</div>
            </div>
            <div className="message own">
              <div className="message-text"> I am good.?</div>
              <div className="message-time">12:30</div>
            </div>
            <div className="message own">
              <div className="message-text"> I am good.?</div>
              <div className="message-time">12:30</div>
            </div>
            <div className="message own">
              <div className="message-text"> I am good.?</div>
              <div className="message-time">12:30</div>
            </div>
            <div className="message own">
              <div className="message-text"> I am good.?</div>
              <div className="message-time">12:30</div>
            </div>
            <div className="message own">
              <div className="message-text"> I am good.?</div>
              <div className="message-time">12:30</div>
            </div>
          </div>
        </div>
        <div className="chat-footer">
          <img src={userProfile} alt="user" />
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
          <div className="send">
            <button>send <SendIcon className="icon" /></button>
          </div>
        </div>
      </div>
    </>
  );
}
