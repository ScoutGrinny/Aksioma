import React, { useState, useEffect } from 'react';
import style from './StylePurshases.module.css';

export default function Purchases() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/purchasesHistory', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setPurchases(data);
      })
      .catch(console.log);
  }, []);

  return (
<div className={style.containerMain}>
<div className={style.containerItems}>
  {purchases && purchases.map((el) => (
    <div key={el.id} className={style.containerInfo}>
      <div className={style.containerImg}><img className={style.ImgLot} src={`http://localhost:3001/${el.purchase.image}`} alt={el.purchase.name} /></div>
      <div className={style.containerName}>
      <div className={style.element}>Название: {el.purchase.name}</div>
      <div className={style.element}>Цена: {el.purchase.price}$ </div>
      <div className={style.element}>Куплено: {new Date(el.data).toLocaleDateString()}</div>
      </div>
    </div>
  ))}
</div>
</div>
  );
}
