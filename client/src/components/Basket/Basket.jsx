import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Basket.module.css';
import { basketDel } from '../../store/actions/basketAction';

export default function Basket() {
  const dispatch = useDispatch();
  const basket = useSelector((store) => store.basketStore);

  const delBasket = (el) => {
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
      .then((res) => {
        if (res.status === 'deleted') {
          dispatch(basketDel(el.id));
        }
      })
      .catch();
  };

  return (

    <div className={styles.container}>
    <div className={styles.product_wrapper}>
      {basket?.length > 0 && basket.map((el) => (
         <div className={styles.product} key={el.id}>
           <div> <img className={styles.picture} src={`http://localhost:3001/${el.image}`} alt="" /></div>
           <div className={`${styles.name} ${styles.nameAcc}`}> {el.name}</div>
           <div className={styles.name}> {el.price} $</div>
           <button className={`${styles.customBtn} ${styles.btn5}`} onClick={() => delBasket(el)} type="button">Удалить</button>
         </div>
      )) }
    <div className={styles.arrange}>
            <h2 className="h2Allprice">
              Общая сумма: {basket.reduce((acc, el) => acc + el.price, 0)} $
            </h2>
          <Link to="/payment"><button className={`${styles.customBtn} ${styles.btn9}`} type="button">Оформить</button></Link>
          <img className={styles.paymentGif} src="http://localhost:3001/public/images/31213212321gidssd.webp" alt="" />
    </div>
    </div>
    </div>

  );
}
