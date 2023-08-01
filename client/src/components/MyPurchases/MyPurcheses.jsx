import React from 'react';
import styles from './MyPurchses.module.css';

export default function MyPurcheses() {
  return (
    <div className={styles.containerItems}>
        <h1>Мои покупки</h1>
        <div className={styles.containerBasket}>
            <div className={styles.mainItems}>
                <div className="boxAccount">
                    <div className={styles}> img</div>
                        <div>
                           Название
                        </div>
                                <div>Цена</div>
                                    <div>
                                        Дата
                                    </div>
                </div>
              <div className={styles.arrange}>
              <div>
                Сумма
              </div>
              </div>
            </div>
        </div>
    </div>
  );
}
