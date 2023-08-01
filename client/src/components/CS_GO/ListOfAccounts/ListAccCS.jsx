/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import './StyleAccounts.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { basketAdd, basketDel } from '../../../store/actions/basketAction';
import Select from '../../Filtr/Select';

export default function ListAccCS() {
  const [acc, setAcc] = useState();
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const basket = useSelector((store) => store.basketStore);
  const user = useSelector((state) => state.userStore);
  console.log('===>>> 👉👉👉 file: ListAccCS.jsx:14 👉👉👉 user', user.user);

  const dispatch = useDispatch();
  useEffect(() => {
    fetch('http://localhost:3001/csgo/listOfAccounts', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setAcc(data.filter((el) => el.CategoryId === 1 && el.GameId === 1));
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
  // <div className="containerItems">
  //     ListOfAccounts
  //     <div className="containerAccount">
  //         <div className="filtr">
  //           <input
  //             placeholder="Поиск...."
  //             value={search}
  //             type="text"
  //             onChange={(e) => setSearch(e.target.value)}
  //           />
  //           <Select
  //             value={sort}
  //             onChange={sortPrice}
  //             defaultValue="Сортировка"
  //             options={[
  //               { value: 'По возрастанию', name: 'По цене(по возрастанию)' },
  //               { value: 'По убыванию', name: 'По цене(по убыванию)' },
  //             ]}
  //           />
  //         </div>
  //         <div className="mainItems">
  //             {filterAcc && filterAcc.map((el) => (
  //                  <div key={el.id} className="boxAccount">
  //                   <div className="containerImg">
  //                     <img className="ImgAcc" src={`http://localhost:3001/${el.image}`} alt="" />
  //                   </div>
  //                      <div>
  //                      <Link to={`${el.id}`}><button>Info</button></Link>
  //                      </div>
  //                              <div id="id" className="text-sm font-medium text-gray-900">{el.price}$</div>
  //                               <p>{el.name}</p>

    //                             {user.user ? (
    //                     <div>
    //                       {basket.some((item) => item.id === el.id) ? (
    //                       <button className="inBasket" onClick={() => removeFromBasket(el)}>В корзине</button>
    //                       ) : (
    //                       <button onClick={(e) => addToBasket(el)}>В корзину</button>
    //                       )}
    //                     </div>
    //                             ) : (
    //                               null
    //                             )}
    //                  </div>
    //             ))}
    //         </div>
    //     </div>
    // </div>
    <div className="bg-black">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filterAcc && filterAcc.map((product) => (
            <div key={product.id} className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={`http://localhost:3001/${product.image}`}
                  alt="img"
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">

                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}

                    <Link to={`${product.id}`}><button>Info</button></Link>
                  </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
                <div>
                                    {user.user ? (
                                      <div>
                                          {basket.some((item) => item.id === product.id) ? (
                                        <button onClick={() => removeFromBasket(product)}><span>В корзине ✓</span></button>
                                          ) : (
                                        <button onClick={(e) => addToBasket(product)}> <span>В корзину</span></button>
                                          )}
                                      </div>
                                    ) : (
                                      null
                                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
