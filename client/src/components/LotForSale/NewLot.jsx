import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import style from './StyleNewLot.module.css';

export default function NewLot() {
  return (
    <div className={style.containerNavCreate}>
    <Sidebar />
    <Outlet />
    </div>
  );
}
