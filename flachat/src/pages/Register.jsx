import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import '../css/form.css';
import { IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setErrorMessage('please fill  all the required fields');
    }
    await axios
      .post('/api/register', {
        username,
        password,
        phone: phoneNumber,
      })
      .then((res) => {
        console.log(res.data);
        setUsername('');
        setPassword('');
        setPhoneNumber('');
      })
      .catch((error) => {
        console.log(error.response);
        setErrorMessage(error.response.data.error);
      });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="form__container">
      <h2>Register</h2>
      <div className="form__controller">
        <form className="top__controller" onSubmit={handleSubmit}>
          <div className="username">
            <input
              type="text"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
              placeholder="username"
            />
          </div>

          <div className="password">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              placeholder="password"
            />
            <IconButton
              className="toggle-show-password"
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
          <div className="phone__number">
            <PhoneInput
              className={'input-phone-number'}
              defaultCountry="KH"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
          </div>

          <button type="submit" className="btn">
            Register
          </button>
        </form>
        <span className="error">{errorMessage && errorMessage}</span>
        <span className="reg__orr__log">
          Already have account?
          <Link to="/login">Login</Link>
        </span>
        <div className="bottom__controller">
          <div className="wrap__bottom">
            <div className="signIn_up_methods">
              <hr />
              or
              <hr />
            </div>
            <div className="login__with">
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
