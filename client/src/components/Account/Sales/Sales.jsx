import React, { useState, useEffect } from 'react';
import style from './StyleSale.module.css';

export default function Sales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/salesHistory', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setSales(data);
      })
      .catch(console.log);
  }, []);

  return (
<div className={style.containerMain}>
  <div className={style.containerItems}>
  {sales && sales.map((el) => (
    <div key={el.id} className={style.containerInfo}>
      <div className={style.containerImg}><img className={style.ImgLot} src={`http://localhost:3001/${el.sales.image}`} alt={el.sales.name} /></div>
      <div className={style.containerName}>
      <div className={style.element}>Название: {el.sales.name}</div>
      <div className={style.element}>Цена: {el.sales.price}$ </div>
      {/* <div className={style.description}>Описание: {el.sales.description}</div> */}
      <div className={style.element}>Продано: {new Date(el.data).toLocaleDateString()}</div>
      </div>
    </div>
  ))}
  </div>
</div>
  );
}
