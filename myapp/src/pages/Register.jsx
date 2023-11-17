import { useContext, useEffect, useState } from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import './form.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const { userCreated, setUserCreated } = useContext(UserContext);
  console.log(userCreated);
  const navigate = useNavigate();
  useEffect(() => {
    if (userCreated) {
      navigate('/');
    }
  }, [navigate, userCreated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post('/api/register', {
          username,
          password,
          ConfirmPassword,
        })
        .then(() => {
          setUserCreated(true);
          setUsername('');
          setPassword('');
          setConfirmPassword('');
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
      <h2>Register</h2>
      <div className="form__controller">
        <form className="top__controller" onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            placeholder="username"
          />
          <input
            type="passwords"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            placeholder="passwords"
          />
          <input
            type="confirm password"
            value={ConfirmPassword}
            onChange={(ev) => setConfirmPassword(ev.target.value)}
            placeholder="confirm password"
          />
          <button type="submit" className="btn">
            Create Account
          </button>
        </form>
        <span className="error">{errorMessage && errorMessage}</span>
        <span className="reg__orr__log">
          Already have an account?
          <Link to="/login">Login here.</Link>
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

export default Register;
