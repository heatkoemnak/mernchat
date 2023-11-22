import '../css/empty.css';
export default function Empty() {
  return (
    <div className="empty">
      <div className="empty-content">
        <img
          src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/336998005/original/9d91e57d1cbdb0c4445acc42af554de6eb650615/design-illustrated-gifts-for-you-just-as-you-need.jpg"
          alt=""
        />
        <span className="welcome">Welcome to Fla Chat</span>
        <p className="select">Select a chat to start the conversation</p>
      </div>
    </div>
  );
}
