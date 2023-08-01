/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { basketAdd, basketDel } from '../../../store/actions/basketAction';
import Select from '../../Filtr/Select';
import styles from './StyleAccounts.module.css';

export default function ListAccDota() {
  const [acc, setAcc] = useState();
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const basket = useSelector((store) => store.basketStore);
  const user = useSelector((state) => state.userStore);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    fetch('http://localhost:3001/dota2/listOfAccounts', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAcc(data.filter((el) => el.CategoryId === 1 && el.GameId === 3));
      })
      .catch(console.log);
  }, []);

  const addToBasket = (el) => {
    // const isInBasket = basket.some((item) => item.id === el.id);
    // if (!isInBasket) {
    //   dispatch(basketAdd(el));
    //   console.log('Добавляем в редакс так как его нет в корзине');
    // }
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
    <div className={styles.containerItems}>
      Аккаунты на продажу
        <div className={styles.containerAccount}>
            <div className={styles.filtr}>
              <div className={styles.filtrColumn}>
              <button className={styles.backBtn} type="button" onClick={() => navigate('/')}>Вернуться к играм</button>
            <input
              className={styles.backBtn}
              placeholder="Поиск...."
              value={search}
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
              <Select
                className={styles.backBtn}
                value={sort}
                onChange={sortPrice}
                defaultValue="Сортировка"
                options={[
                  { value: 'По возрастанию', name: 'По цене(по возрастанию)' },
                  { value: 'По убыванию', name: 'По цене(по убыванию)' },
                ]}
              />
              </div>
            </div>
            <div className={styles.mainItems}>
            {filterAcc && filterAcc.map((el) => (
              <div key={el.id} className={styles.boxAccount}>
                  <div key={el.id} className={styles.containerImg}>
                    <div className={styles.flexImg}>
                    <img className={styles.ImgAcc} src={`http://localhost:3001/${el.image}`} alt="" />
                    {el.name}
                    </div>
                  </div>
                      <div>
                        <Link to={`${el.id}`}><button className={styles.btnItem}><span className={styles.span}>Подробнее</span></button></Link>
                      </div>
                              <div>{el.price} $</div>
                                  <div>
                                    {user.user ? (
                                      <div>
                                          {basket.some((item) => item.id === el.id) ? (
                                        <button className={styles.inBasket} onClick={() => removeFromBasket(el)}><span className={styles.span}>В корзине ✓</span></button>
                                          ) : (
                                        <button className={styles.btnItem} onClick={(e) => addToBasket(el)}> <span className={styles.span}>В корзину</span></button>
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
