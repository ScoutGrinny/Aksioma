import React, { useState } from 'react';
import './supportform.css';

export default function SupportForm() {
  const [answerSupport, setAnswerSupport] = useState('');

  const [form, setForm] = useState({
    text: '',
    tel: '',
    telegramAcc: '',
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/request', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 'error') {
          setAnswerSupport(res.msg);
        } else if (res.status === 'success') {
          setAnswerSupport(res.msg);
        }
      });
  };

  return (
    <>
    <div className="wrapperFormSupport">
        <div className="firstFlex">
          <h2 className="h2hello">Привет!</h2>
          <p className="msgP">Ты можешь оставить обращение</p>
          <img className="imgSupport" src="http://localhost:3001/public/images/supportMsg.jpg" alt="imgSupport" />
        </div>
      <div className="supportForm">
        <form className="formSupport" onSubmit={handleSubmit}>
        <div className="divInput">
            <label className="labeSupport">Опишите вашу проблему <sup>*</sup></label>
            <textarea className="inputSupport problem" rows="10" cols="45" name="text" value={form.text} onChange={handleInput} placeholder="Сообщение" autoComplete="on" />
        </div>
      <div className="divInput">
        <label className="labeSupport">Оставьте ваш номер телефона <sup>*</sup></label>
        <input className="inputSupport" type="integer" value={form.tel} name="tel" onChange={handleInput} placeholder="79.." autoComplete="on" />
      </div>
      <div className="divInput">
        <label className="labeSupport">Оставьте аккаунт в Telegram</label>
        <input className="inputSupport" type="text" value={form.telegramAcc} name="telegramAcc" onChange={handleInput} placeholder="@Никнейм" autoComplete="on" />
      </div>
      <div className="supportBtnSubmitDiv">
      <button className="SubmitBtnSupport" type="submit">Отправить</button>
      </div>
      <div className="answerSupport" />
        </form>
      </div>
    </div>
    <div className="supportAnwer">{answerSupport}</div>
    </>
  );
}
