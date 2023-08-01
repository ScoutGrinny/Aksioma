import React from 'react';
// import Maps from './Map/Map';
import { Link } from 'react-router-dom';
import styles from './styleFooter.module.css';

export default function Footer() {
  return (
    <div className={styles.containerFooter}>
 <div className={styles.footer}>
        <Link className={styles.textLink} to="/contacts"> Контакты </Link>
        <div className={styles.data}>
        © 2022
        </div>
 </div>
    </div>
  );
}
