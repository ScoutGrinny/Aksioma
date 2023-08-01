import React from 'react';
import { Link } from 'react-router-dom';
import style from './StyleSideBar.module.css';
import ImgDota from '../img/dota-2-logo-C88DABB066-seeklogo.com.png';
import ImgCs from '../img/csgo-icon-1.png';
import ImgWow from '../img/world-of-warcraft.svg';

export default function Sidebar() {
  return (
    <div className={style.containerSideBar}>

   <Link className={style.text} to="/account/newLot/csgo">
          <div className={style.containerImgAcc}>
             <img className={style.imgAcc} src={ImgCs} alt="img" />
          </div>

   </Link>
   <Link className={style.text} to="/account/newLot/dota">
          <div className={style.containerImgAcc}>
             <img className={style.imgAcc} src={ImgDota} alt="img" />
          </div>
   </Link>
   <Link className={style.text} to="/account/newLot/wow">
          <div className={style.containerImgAcc}>
             <img className={style.imgAcc} src={ImgWow} alt="img" />
          </div>

   </Link>
    </div>

  );
}
