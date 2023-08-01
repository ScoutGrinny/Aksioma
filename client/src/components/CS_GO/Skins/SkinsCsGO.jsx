/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './StyleSkins.module.css';
import { basketAdd, basketDel } from '../../../store/actions/basketAction';
import Select from '../../Filtr/Select';

export default function SkinsCsGO() {
  const [skins, setSkins] = useState();
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const basket = useSelector((store) => store.basketStore);
  const user = useSelector((state) => state.userStore);

  const dispatch = useDispatch();
  useEffect(() => {
    fetch('http://localhost:3001/csgo/services', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setSkins(data.filter((el) => el.CategoryId === 2 && el.GameId === 1));
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
    // setSkins([...skins].sort((a, b) => a[el] - b[el]));
    if (el === 'По возрастанию') {
      setSkins([...skins].sort((a, b) => a.price - b.price));
    }
    if (el === 'По убыванию') {
      setSkins([...skins].sort((a, b) => b.price - a.price));
    }
  };

  const filterSkins = skins?.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()));

  const filterAcc = skins?.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()));

  return (
  <div className={styles.containerItems}>
    <div className={styles.containerAccount}>
        <div className="filtr">
        <input
          placeholder="Поиск...."
          value={search}
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />

         <Select
           value={sort}
           onChange={sortPrice}
           defaultValue="Сортировка"
           options={[
             { value: 'По возрастанию', name: 'По цене(по возрастанию)' },
             { value: 'По убыванию', name: 'По цене(по убыванию)' },
           ]}
         />
        </div>
        <div className={styles.mainItems}>

        {filterSkins && filterSkins.map((el) => (
            <div key={el.id} className={styles.boxItems}>
                <div className={styles.containerImgItems}>
                <img className={styles.ImgAcc} src={`http://localhost:3001/${el.image}`} alt="img" />
                </div>
                <div className={styles.containerBtn}>
                    <div>{el.name}</div>
                        <div>{el.price}$</div>
                            <div>
                            <Link to={`${el.id}`}><button>Info</button></Link>
                            </div>
                                <div>
                                  {user.user ? (
                                    <div>
                                       {basket.some((item) => item.id === el.id) ? (
                                    <button className={styles.inBasket} onClick={() => removeFromBasket(el)}>В корзине</button>
                                       ) : (
                                    <button onClick={(e) => addToBasket(el)}>В корзину</button>
                                       )}
                                    </div>
                                  ) : (
                                    null
                                  )}

                                </div>
                </div>
            </div>
        )) }
        </div>
    </div>

  </div>
  );
}
