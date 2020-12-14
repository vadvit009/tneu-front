import React, {useState} from "react";
import s from './Login.module.css';
import {_axios} from "../../../axios/_axios";
import {useHistory} from 'react-router-dom';

const Login = () => {
  const [login, setLogin] = useState({email: '', pass: ''});
  const h = useHistory();
  const handlePost = () => {
    _axios.post('/login', login)
      .then((res) => {
        // res.status === 200 &&
        localStorage.setItem('_token', res.data.token)
        h.push('/admin')
      })
      .catch(e => {
        h.push('/admin')
        console.log(e)
      })
  }
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <h3>Email</h3>
        <input type={'email'} onChange={(e) => setLogin({...login, email: e.target.value})}/>
        <h3>Password</h3>
        <input type={'password'} onChange={(e) => setLogin({...login, pass: e.target.value})}/>
        <div className={s.submit}>
          <button onClick={handlePost}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login;
