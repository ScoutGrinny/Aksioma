import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import style from './StyleAccount.module.css';
import ImgLot from './img/HS_24p6_PP_RegularPack_PRODUCT-THUMB-960x540.webp';
import ImgCreateSale from './img/687474703a2f2f692e696d6775722e636f6d2f6868384d557a562e6a7067.jpeg';
import ImgSales from './img/dota.png';
import ImgPurchases from './img/1042585.jpg';
import ImgAvatar from './img/1643196547_1-abrakadabra-fun-p-generator-avatarok-pod-nik-9.jpg';
import ImgSupport from './img/GettyImages-1199145131-scaled.jpg';
import ImgMail from './img/Снимок экрана 2022-12-16 145011.png';
// import AccountsAvatar from './AccountsAvatar/AccountsAvatar';

export default function Account() {
  return (
        <>
        {/* <AccountsAvatar /> */}
        <div className={style.containerAccNav}>
            <Link className={style.text} to="/account/lots">
          <div className={style.containerImgAcc}>
             <img className={style.imgLot} src={ImgLot} alt="img" />
          </div>
                <div>
                Мои лоты
                </div>
            </Link>
            <Link className={style.text} to="/account/sales">
          <div className={style.containerImgAcc}>
             <img className={style.imgLot} src={ImgSales} alt="img" />
          </div>
                <div>
                Мои продажи
                </div>
            </Link>
            <Link className={style.text} to="/account/purchases">
          <div className={style.containerImgAcc}>
             <img className={style.imgLot} src={ImgPurchases} alt="img" />
          </div>
                <div>
                Мои покупки
                </div>
            </Link>
            <Link className={style.text} to="/account/newLot">
          <div className={style.containerImgAcc}>
             <img className={style.imgLot} src={ImgCreateSale} alt="img" />
          </div>
                <div>
                Создать Новый лот
                </div>
            </Link>
            <Link className={style.text} to="/account/avatar">
          <div className={style.containerImgAcc}>
             <img className={style.imgLot} src={ImgAvatar} alt="img" />
          </div>
                <div>
                    Добавить Аватар
                </div>
            </Link>
            <Link className={style.text} to="/account/support">
               <div className={style.containerImgAcc}>
                   <img className={style.imgLot} src={ImgSupport} alt="img" />
               </div>
                <div>
                     Поддержка
                </div>
            </Link>

            <Link className={style.text} to="/account/userPlea">
               <div className={style.containerImgAcc}>
                  <img className={style.imgLot} src={ImgMail} alt="img" />
               </div>
                <div>Обращения пользователя</div>
            </Link>
        </div>
        <Outlet />
        </>
  );
}
