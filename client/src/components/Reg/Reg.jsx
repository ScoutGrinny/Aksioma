import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classes from './reg.module.css';

import { userRegistration } from '../../store/actions/userAction';

export default function Reg() {
  const dispatch = useDispatch();

  const [regMsg, setRegMsg] = useState(null);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    login: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/reg', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(((res) => {
        if (res.status === 'error') {
          setRegMsg(res.msg);
        } else if (res.status === 'success') {
          setRegMsg(res.msg);
          setTimeout(() => {
            dispatch(userRegistration({
              login: res.login,
              userId: res.userId,
              isAdmin: res.isAdmin,
              image: res.image,
            }));
            navigate('/');
          }, 1000);
        }
      }));
  };
  return (
    <div className={classes.wrapper}>
      <img className={classes.img} src="http://localhost:3001/public/images/longSwordReg.png" alt="" />
    <div className={classes.regForm}>
    <form onSubmit={handleSubmit}>
    <div className={classes.inputForm}>
    <label className={classes.labelForm}>Ваш логин:</label>
    <input className={classes.inputReg} type="text" value={form.name} name="login" placeholder="Логин*" onChange={handleInput} autoComplete="on" />
    </div>
    <div className={classes.inputForm}>
    <label className={classes.labelForm}>E-mail адрес:</label>
    <input className={classes.inputReg} type="email" value={form.email} name="email" placeholder="Email*" onChange={handleInput} autoComplete="on" />
    </div>
    <div className={classes.inputForm}>
    <label className={classes.labelForm}>Пароль:</label>
    <input className={classes.inputReg} type="password" value={form.password} name="password" placeholder="Password*" onChange={handleInput} autoComplete="on" />
    </div>
    <div className={classes.inputForm}>
    <label className={classes.labelForm}>Повторите пароль:</label>
    <input className={classes.inputReg} type="password" value={form.confirmPassword} placeholder="Password*" name="confirmPassword" onChange={handleInput} autoComplete="on" />
    </div>
      <div className={classes.btnSubmit}>
    <button className={classes.regBtn} type="submit">Зарегистрироваться</button>
      </div>
    </form>
    </div>
    <div className={classes.answerReg}>{regMsg}</div>
    </div>
  );
}
