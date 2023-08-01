import React, { useState } from 'react';
import './auth.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userAuth } from '../../store/actions/userAction';
import { BasketAddFromBd } from '../../store/actions/basketAction';

export default function Auth() {
  // const user = useSelector((store) => store.userStore);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [form, setForm] = useState({
    login: '',
    password: '',
  });

  const [answer, setAnswer] = useState(null);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/auth', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(({
        user, basket, status, msg,
      }) => {
        // console.log(user, basket, status, msg);
        if (status === 'error') {
          setAnswer(msg);
        }
        if (status === 'success') {
          setAnswer(msg);
          setTimeout(() => {
            // dispatch(userAuth({
            //   login: res.login,
            //   userId: res.userId,
            //   isAdmin: res.isAdmin,
            //   image: res.image,
            // }));
            dispatch(userAuth(user));
            dispatch(BasketAddFromBd(basket));

            navigate('/');
          }, 1000);
        }
      });
  };

  return (
    <div className="authWrapper">
      <img className="imgAuth" src="http://localhost:3001/public/images/331231233.png" alt="img" />
    <div className="authForm">
      <form onSubmit={handleSubmit}>
      <div className="inputForm">
      <label className="labelForm">Логин:</label>
      <input className="inputLog" type="text" value={form.login} name="login" onChange={handleInput} placeholder="Логин*" autoComplete="on" />
      </div>
      <div className="inputForm">
      <label className="labelForm">Пароль:</label>
      <input className="inputLog" type="password" value={form.password} name="password" placeholder="Пароль*" onChange={handleInput} autoComplete="on" />
      </div>
      <div className="btnSubmit">
      <button className="authBtn" type="submit">Submit</button>
      </div>

      </form>
    </div>
    <div className="answerAuth">
        {answer}
    </div>
    </div>
  );
}
