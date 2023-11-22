import '../css/profile.css';
export default function Profile() {
  return (
    <div className="profile">
      <h2>Profile</h2>
      <div className="profile-info">
        <div className="profile-info-left">
          <img src="https://picsum.photos/200" alt="profile" />
          <button type="submit">Edit profile image</button>
        </div>
      </div>
    </div>
  );
}
