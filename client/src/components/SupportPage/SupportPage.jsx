import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './supportpage.css';

export default function SupportPage() {
  const [pleas, setPleas] = useState([]);
  const [classForm, setClassForm] = useState('formClassNone');
  const [adminMsg, setAdminMsg] = useState({ adminAnswer: '', userPleaId: '' });
  useEffect(() => {
    console.log('useeffect');
    fetch('http://localhost:3001/admin', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPleas(res.allPleasData);
      })
      .catch();
  }, []);

  const showAnwerForm = (el) => {
    setClassForm('formAnswerPleas');
    setAdminMsg({ adminAnswer: '', userPleaId: el.id });
  };

  const textAreaMsg = (e) => {
    setAdminMsg({ ...adminMsg, adminAnswer: e.target.value });
  };

  const sendAnswer = () => {
    setClassForm('formClassNone');
    fetch('http://localhost:3001/admin', {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(adminMsg),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'success') {
          setPleas(pleas.filter((el) => el.id !== +adminMsg.userPleaId));
        }
      });
  };

  const currentPlea = pleas.find((el) => el.id === adminMsg.userPleaId);

  return (
    <>
    <p className="pBtn">
   <Link className="nav-main" to="/admin/lots"><button className="goTobtn1">Перейти на лоты</button></Link>
    </p>
    {!pleas.length ? (
      <h2 className="h2SupportMain">Запросов на данный момент нет</h2>
    ) : (
      <div className="wrapperUserPleas">
        <h2 className="h2SupportMain">Запросы пользователей</h2>
      {pleas.map((el) => (
      <div key={el.id} className="plea">
        <div className="elPlusDate">
        <p className="textMsgPlea"> {el.question}</p>
        <p className="dateSupportPlea">{new Date(el.createdAt).toLocaleString()}</p>
        </div>
        <button className="btnSupportAnswer" onClick={() => showAnwerForm(el)} type="button">Ответить</button>
      </div>
      ))}
      </div>
    )}
  <form className={classForm} action="">
    <div className="formMsg">{currentPlea?.question}</div>
        <textarea onChange={textAreaMsg} className="formElement inputPleaAnswer" placeholder="Ответ" type="text" name="adminAnswer" value={adminMsg.adminAnswer} id="" />
        <button onClick={sendAnswer} className="formBtn" type="button">Отправить</button>
  </form>
    </>
  );
}
