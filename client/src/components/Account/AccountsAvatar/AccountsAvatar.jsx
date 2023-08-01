import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAvatar } from '../../../store/actions/userAction';
import style from './styleAvatar.module.css';

export default function AccountsAvatar() {
  const { user } = useSelector((store) => store.userStore);
  const [img, setImg] = useState(null);
  const [form, setForm] = useState({
    image: '',
  });
  const [userBD, setUseBD] = useState(`${user?.image}`);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:3001/account', {

      credentials: 'include',

    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(userAvatar(res.image));
        setUseBD(res.image);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('avatar', img);
    data.append('form', JSON.stringify(form));
    fetch('http://localhost:3001/account', {
      method: 'PUT',
      credentials: 'include',
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(userAvatar(res.image));
        setUseBD(res.image);
      });
  };

  const testImg = (e) => {
    setImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  return (
    <div className={style.main}>
 <div className={style.containerAvateCreate}>
    <h2>Добрый день, { user && user.login}!</h2>
    <div>
      {user.image ? (<img className={style.imgCreateAvatar} src={`http://localhost:3001/${userBD && userBD}`} alt="" />)
        : <img className={style.imgCreateAvatar} src="https://via.placeholder.com/150" alt="" /> }

    </div>
            <form className={style.form} onSubmit={handleSubmit}>
                <h2 className={style.changeAvatarH2}>Изменить Аватар</h2>
            <input className={style.inputMulter} type="file" onChange={testImg} />
            <button className={style.button} type="submit" id={user && user.userId}>Изменить</button>
            </form>
 </div>
    </div>

  );
}
