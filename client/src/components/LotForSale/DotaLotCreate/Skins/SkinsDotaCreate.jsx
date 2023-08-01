import React, { useState } from 'react';
import style from './StyleSkins.module.css';

export default function SkinsDotaCreate() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    GameId: 3,
    CategoryId: 2,
    image: '',
    description: '',
  });
  const [img, setImg] = useState(null);
  const [regMsg, setRegMsg] = useState(null);

  const handeleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('avatar', img);
    data.append('form', JSON.stringify(form));
    fetch('http://localhost:3001/account/newLot/dota/skinsCreate', {
      method: 'POST',
      credentials: 'include',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setRegMsg('Лот успешно создан. В данный момент находится на рассмотрении. Статус можете отслеживать в личном кабинете в моих лотах');
        console.log(res);
      });
    setForm(form);
    console.log(form);
  };

  const testImg = (e) => {
    setImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  return (
    <div className={style.form}>
    <form className={style.containerInput} onSubmit={handleSubmit}>
                  <h2>Создать лот на скин</h2>
            <input className={style.input} onChange={handeleInput} name="name" value={form.name} placeholder="Название" />
            <input className={style.input} onChange={handeleInput} name="price" value={form.price} placeholder="Цена" />
            <input className={style.inputMulter} type="file" onChange={testImg} />
            <textarea className={style.textarea} onChange={handeleInput} name="description" value={form.description} placeholder="Описание" />
            <button className={style.button} type="submit">Создать</button>
            <div className={style.regMsg}>{regMsg}</div>
    </form>
    </div>
  );
}
