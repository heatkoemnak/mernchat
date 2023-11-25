import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import '../css/form.css';
import axios from 'axios';
import { Context } from '../Context/Context';
export default function Login() {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [phone, setPhone] = useState();
  const { user } = useContext(Context);
  const history = useNavigate();

  useEffect(() => {
    if (user) {
      history('/');
    }
  }, [history, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!phone || !password) {
      setErrorMessage('please fill  all the required fields');
    }
    await axios
      .post('/api/login', {
        password,
        phone,
      })
      .then(() => {
        window.location.reload();
        setPassword('');
        setPhone('');
      })
      .catch((error) => {
        console.log(error.response);
        setErrorMessage(error.response.data.error);
      });
  };

  const SignInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        const username = result.user.displayName;
        const profile = result.user.photoURL;
        localStorage.setItem('user', username);
        localStorage.setItem('profile', profile);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="form__container">
      <h2>Login</h2>
      <div className="form__controller">
        <form className="top__controller" onSubmit={handleSubmit}>
          <div className="username">
            <input
              type="text"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              placeholder="password"
            />
          </div>
          <div className="phone__number">
            <PhoneInput
              className={'input-phone-number'}
              defaultCountry="KH"
              placeholder="Enter phone number"
              value={phone}
              onChange={setPhone}
            />
          </div>

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
            <div className="signIn_up_methods">
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
