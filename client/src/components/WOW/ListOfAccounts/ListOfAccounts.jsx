/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import style from './StyleAccounts.module.css';
import { basketAdd, basketDel } from '../../../store/actions/basketAction';
import Select from '../../Filtr/Select';

export default function ListOfAccounts() {
  const [acc, setAcc] = useState();
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const basket = useSelector((store) => store.basketStore);
  const user = useSelector((store) => store.userStore);

  const dispatch = useDispatch();
  useEffect(() => {
    fetch('http://localhost:3001/wow/listOfAccounts', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setAcc(data.filter((el) => el.CategoryId === 1 && el.GameId === 2));
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
  const sortPrice = (el) => {
    setSort(el);
    // setAcc([...acc].sort((a, b) => a[el] - b[el]));
    if (el === 'По возрастанию') {
      setAcc([...acc].sort((a, b) => a.price - b.price));
    }
    if (el === 'По убыванию') {
      setAcc([...acc].sort((a, b) => b.price - a.price));
    }
  };
  const filterAcc = acc?.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={style.containerItems}>

    <div className={style.containerAccount}>
            <div className={style.filtr}>
              <input
                className={style.Input}
                placeholder="Поиск...."
                value={search}
                type="text"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Select
                className={style.Input}
                value={sort}
                onChange={sortPrice}
                defaultValue="Сортировка"
                options={[
                  { value: 'По возрастанию', name: 'По цене(по возрастанию)' },
                  { value: 'По убыванию', name: 'По цене(по убыванию)' },
                ]}
              />
            </div>
            <div className={style.mainItems}>
                {filterAcc && filterAcc.map((el) => (
              <div key={el.id} className={style.boxAccount}>
                    <div key={el.id} className={style.containerImg}>
                      <img className={style.ImgAcc} src={`http://localhost:3001/${el.image}`} alt="" />
                    </div>
                        <div>
                          <Link className={style.text} to={`${el.id}`}>Подробнее...</Link>
                        </div>
                                <div className={style.Price}>Цена: ${el.price}</div>
                                <div>{el.name}</div>
                                    <div>
                                      {user.user ? (
                                        <div>
                                          {basket.some((item) => item.id === el.id) ? (
                                          <button className={style.inBasket} onClick={() => removeFromBasket(el)}>В корзине</button>
                                          ) : (
                                          <button className={style.toBasket} onClick={(e) => addToBasket(el)}>В корзину</button>
                                          )}
                                        </div>
                                      ) : (
                                        null
                                      )}
                                    </div>
              </div>
                ))}
            </div>
    </div>
    </div>
  );
}
