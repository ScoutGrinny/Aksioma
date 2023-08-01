/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../dota.module.css';

export default function NavBar() {
  return (
    <div className={styles.contanerNavbar}>
      <div>
      <img className={styles.imgDota} src="http://localhost:3001/public/images/dota2-logo-official.png" alt="dota-2-logo" />
      </div>
    <Link to="/dota2/listOfAccounts">
        <button className={styles.navBtn}> Список Аккаунтов </button>
    </Link>
    <Link to="/dota2/skins">
      <button className={styles.navBtn}>Скины</button>
    </Link>
    <Link to="/dota2/services">
       <button className={styles.navBtn}>Услуги</button>
    </Link>
    </div>
  );
}
