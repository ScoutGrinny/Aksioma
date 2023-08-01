/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import videoWow from './Video/Ролик World of Warcraft_ Battle for Azeroth (online-video-cutter.com).mp4';

import style from './styleWow.module.css';

export default function WOW() {
  return (
    <>
    <div className={style.intro}>
      <div className={style.containerVideo}>
      <NavBar />
        <video className={style.VideoWow} src={videoWow} autoPlay loop muted />
      </div>
    </div>
    <Outlet />
    </>
  );
}
