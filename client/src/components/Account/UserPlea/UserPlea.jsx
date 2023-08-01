import React, { useEffect, useState } from 'react';
import './userPlea.css';

export default function UserPlea() {
  const [userPleas, setUserPleas] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/request', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        setUserPleas(res);
      });
  }, []);

  return (
      <div>
        {!userPleas.length ? (
          <div className="textQuest">
            Обращения отсутствуют
          </div>
        ) : (
          <div className="wrapperUserPlea">
            {userPleas.map((el) => (
            <div className="containerUserPlea" key={el.id}>
           <p>Текст обращения: {el.question}</p>
           <p>Дата создания: {new Date(el.createdAt).toLocaleString()}</p>
            {el.status ? (
              <>
              <p>Статус: <span className="done">завершено</span></p>
              <p>Ответ: {el.answer} </p>
              </>
            ) : (
             <p>Статус: <span className="inWork">в работе</span></p>
            )}
            {/* <p> Ответ: {el.answer}</p> */}
            </div>
            ))}
          </div>
        )}
      </div>
  );
}
