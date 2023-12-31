import { useContext, useEffect, useState } from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import './form.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/chat');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage('please fill  all the required fields');
    }
    try {
      await axios.post('/api/login', { username, password }).then(() => {
        window.location.reload();
        setUsername('');
        setPassword('');
      });
    } catch (error) {
      console.log(error.response);
      setErrorMessage(error.response.data.error);
    }
  };
  const SignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider).then((err, result) => {
        if (err) console.log(err);
        else {
          console.log(result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="form__container">
      <h2>Login</h2>
      <div className="form__controller">
        <form className="top__controller" onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            placeholder="username"
          />
          <input
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            placeholder="password"
          />
          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <span className="error">{errorMessage && errorMessage}</span>
        <span className="reg__orr__log">
          Do not have an account?
          <Link to="/register">Register</Link>
        </span>
        <div className="bottom__controller">
          <div className="wrap__bottom">
            <div className="signin_up_methods">
              <hr />
              or
              <hr />
            </div>
            <div className="login__with" onClick={SignInWithGoogle}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                alt=""
              />
              <span>Google</span>
            </div>
            <div className="login__with">
              <img
                src="https://static-00.iconduck.com/assets.00/facebook-icon-512x512-seb542ju.png"
                alt=""
              />
              <span>Facebook</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
