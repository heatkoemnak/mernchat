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
  const [errorMessage, setErrorMessage] = useState();
  const { user } = useContext(UserContext);
  console.log(errorMessage);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/chat');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('please fill  all the required fields');
    }
    try {
      await axios.post('/api/login', { username, password }).then(() => {
        window.location.reload();
        setUsername('');
        setPassword('');
      });
    } catch (error) {
      setErrorMessage(error.response.data);
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
          <button type="submit">Login</button>
        </form>
        <span className="reg__orr__log">
          {errorMessage?.errorMessage}
          Do not have an account?
          <Link to="/register" className="span">
            Register
          </Link>
        </span>
        <div className="bottom__controller">
          <div className="wrap__bottom">
            <h3>Sign in with</h3>
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
