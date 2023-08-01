/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './productDetails.module.css';

import { basketAdd, basketDel } from '../../store/actions/basketAction';

export default function Product() {
  const [product, setProduct] = useState(null);
  const user = useSelector((state) => state.userStore);
  const basket = useSelector((store) => store.basketStore);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const url = `http://localhost:3001/product/${params.id}`;

  useEffect(() => {
    fetch(url, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
      })
      .catch(console.log);
  }, []);

  const addToBasket = (el) => {
    fetch('http://localhost:3001/basket', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(el),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 'success') {
          dispatch(basketAdd(el));
        }
      });
  };

  const removeFromBasket = (el) => {
    dispatch(basketDel(el.id));
    fetch('http://localhost:3001/basket', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        el,
      ),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch();
  };

  return (
    <>
  {/* <button type="button" onClick={() => navigate(-1)}>Вернуться назад</button> */}
    {product ? (
<div className={styles.mainDiv}>
      <div className={styles.imageDiv}><img className={styles.image} src={`http://localhost:3001/${product.product.image}`} alt={product.name} /></div>

      <div className={styles.textDiv}>
        <div className={styles.description}> <h2>{product.product.name}</h2></div>
        <div className={styles.description}>{product.product.description}</div>
        <div className={styles.name}><h2 className={styles.h2}>{product.product.price}$</h2></div>
        <div className={styles.description}>Продавец: {product?.vendorName}</div>
        {user.user ? (
          <div>
            {basket.some((item) => item.id === product.product.id) ? (
              <button className={styles.buttonFromBasket} onClick={() => removeFromBasket(product.product)}>В корзине</button>
            ) : (
              <button className={styles.buttonInBasket} onClick={() => addToBasket(product.product)}>В корзину</button>
            )}
          </div>

        ) : (null)}
        <button className={styles.buttonBack} onClick={() => navigate(-1)}>Назад</button>
      </div>

</div>
    ) : (null)}

    </>
  );
}
