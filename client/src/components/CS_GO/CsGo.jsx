import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import style from './StyleCs.module.css';
import img from './img/Без названия.gif';

export default function CsGo() {
  const navigate = useNavigate();
  return (
    <div className={style.container}>

<div className={style.containerCs}>
      {/* <button type="button" onClick={() => navigate('/')}>Вернуться к играм</button>
      <NavBar /> */}
      <div className={style.text}>
      Страница находится в стадии разработки..
      </div>
      <div>
      <img className={style.img} src={img} alt="gif" />
      </div>

</div>
    </div>

  );
}
