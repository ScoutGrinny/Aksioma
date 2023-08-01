/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/world-of-warcraft-logo-transparent-png-482764.png';
import ImgAcc from '../img/wow-sub-2022-shop-product-arthas-and-rag-960x540.webp';
import ImgItems from '../img/10.0_Dragonflight_BrowsingCard_960x540.webp';
import ImgServic from '../img/WoW_YearofAzeroth_BNET_upsell1_960x540.webp';
import style from './StyleNavbar.module.css';

export default function NavBar() {
  return (
    <div className={style.containerMain}>
      <div className={style.contanerNavbar}>
      <div className={style.containerLogo}>
      <img className={style.Logo} src={Logo} alt="logo" />
      </div>
      </div>
      <div className={style.containerImgCateg}>
      <Link className={style.text} to="/wow/listOfAccounts">
          <div className={style.containerImgAcc}>
             <img className={style.imgAcc} src={ImgAcc} alt="img" />
          </div>
                <div>
                    Аккаунты
                </div>
      </Link>
      <Link className={style.text} to="/wow/items">
          <div className={style.containerImgAcc}>
             <img className={style.imgAcc} src={ImgItems} alt="img" />
          </div>
                <div>
                    Предметы
                </div>
      </Link>
      <Link className={style.text} to="/wow/services">
          <div className={style.containerImgAcc}>
             <img className={style.imgAcc} src={ImgServic} alt="img" />
          </div>
                <div>
                    Услуги
                </div>
      </Link>

      </div>
    </div>
  //   <div>
  //   <Link className={style.text} to="/wow/listOfAccounts">
  //     Аккаунты
  //   </Link>
  //
  // <Link className={style.text} to="/wow/services">
  //       Услуги
  // </Link>
  // <Link className={style.text} to="/">
  //        Назад
  // </Link>
  //   </div>

  );
}
