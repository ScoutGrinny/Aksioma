import React from 'react';
import styles from './MySales.module.css';

export default function MySales() {
  return (
    <div><div className={styles.containerItems}>
   <h1>Мои продажи</h1>
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
    </div>
  );
}
