import React from 'react';
import { Link } from 'react-router-dom';
import style from './StyleNavbar.module.css';

export default function Navbar() {
  return (
    <div className={style.containerNavbar}>
    <Link className={style.text} to="/account/newLot/wow/createAcc">Добавить лот на аккаунт</Link>
    <Link className={style.text} to="/account/newLot/wow/skinsCreate">Добавить лот на предмет</Link>
    <Link className={style.text} to="/account/newLot/wow/servicesCreate">Добавить лот на услуги</Link>
    </div>

  );
}
