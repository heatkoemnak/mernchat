import { Link, useNavigate } from 'react-router-dom';
import './home.css';
import { useContext, useEffect } from 'react';
import { UserContext } from '../Context/UserContext';
function Home() {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      navigate('/home');
    }
  }, [navigate, user]);

  return (
    <>
      <div className="home">
        <div className="area-home">
          <ul className="circles-home">
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
        <div className="home-content">
          <img
            className="img"
            src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/336998005/original/9d91e57d1cbdb0c4445acc42af554de6eb650615/design-illustrated-gifts-for-you-just-as-you-need.jpg"
            alt=""
          />
          <span className="welcome">Welcome to Mern Chat App</span>
          <p className="select">Login your account</p>
          <Link to="/login" className="login-link">
            <button className="login">Login</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
