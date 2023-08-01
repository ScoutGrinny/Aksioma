import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './supportLots.css';

export default function SupportLots() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/admin/lots', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setProducts(res);
      })
      .catch();
  }, []);

  const addLot = (el) => {
    console.log(el);
    fetch('http://localhost:3001/admin/lots', {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(el),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'success') {
          setProducts(products.filter((product) => product.id !== el.id));
        }
      });
  };

  const removeLot = (el) => {
    fetch('http://localhost:3001/admin/lots', {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(el),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'success') {
          setProducts(products.filter((product) => product.id !== el.id));
        }
      });
  };
  return (
    <>
    <p className="pBtn1">
    <Link to="/admin"><button className="goTobtn">Назад к обращениям</button></Link>
    </p>
    <h2 className="h2">Новые лоты от пользователей</h2>
    <div className="mainDivWrapper">
    {products.map((product) => (
    <div className="supportLotWrapper" key={product.id}>
      <div className="userLotsAdmin"><img className="imgLot" src={`http://localhost:3001/${product.image}`} alt="lotImage" />
      </div>
      <div className="supportLot">
        <div>
        Название: {product.name}
        </div>
        <div>
         Цена: {product.price}
        </div>
        <div>
        Описание: {product.description}
        </div>
      </div>
      <div>
        <button className="btnsAdminLots" type="button" onClick={() => addLot(product)}>Одобрить</button>
        <button className="btnsAdminLots" type="button" onClick={() => removeLot(product)}>Отклонить</button>
      </div>
    </div>
    ))}
    </div>
    </>
  );
}
