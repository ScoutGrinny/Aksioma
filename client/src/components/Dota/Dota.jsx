import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import styles from './dota.module.css';

export default function Dota() {
  return (
    <div className={styles.container}>
      <NavBar />
    <Outlet />
    </div>
  );
}
