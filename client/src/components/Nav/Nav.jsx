/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './nav.css';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout, userAvatar } from '../../store/actions/userAction';
import { basketLogout } from '../../store/actions/basketAction';
import Avatar from '../Account/img/1643196547_1-abrakadabra-fun-p-generator-avatarok-pod-nik-9.jpg';

export default function Nav() {
  const user = useSelector((store) => store.userStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('http://localhost:3001/logout', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 'success') {
          dispatch(userLogout(null));
          dispatch(basketLogout([]));
        }
        navigate('/');
      });
  };
  // useEffect(() => {
  //   fetch('http://localhost:3001/account', {

  //     credentials: 'include',

  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setTimeout(() => {
  //         console.log(res.image, 'nav useeffect');
  //         dispatch(userAvatar(res.image));
  //         setUseBD(res.image);
  //       }, 50);
  //     });
  // }, []);

  return (

  <div className="nav-div">
    <div className="wrapper">
  <div className="container">
    <h1>Game Store</h1>
  </div>
    </div>
    <Link className="nav-main" to="/">Главная</Link>
  {user.user ? (
    <>
    {/* <Link className="nav-main" to="/basket"> Корзина </Link>basket123213 */}
     <Link className="nav-main nav-mainAvatar" to="/account"> Личный кабинет
    {!user.user.image ? <img className="imgAvatar" src={Avatar} alt="img" /> : <img className="imgAvatar" src={`http://localhost:3001/${user.user?.image && user.user?.image}`} alt="Avatar" /> }
     </Link>
     <Link className="nav-main" to="/basket"> <img className="imgBasket" src="http://localhost:3001/public/images/123123dasda.jpeg" alt="" /> </Link>
 <button className="logout-btn" onClick={handleLogout} type="button">Выйти</button>

 {user.user.isAdmin && <Link className="nav-main" to="/admin"> Админ </Link>}
    </>
  ) : (
    <>
    <Link className="nav-main" to="/reg">Регистрация</Link>
    <Link className="nav-main" to="/auth">Авторизация</Link>
    </>
  )}
  </div>
  );
}
