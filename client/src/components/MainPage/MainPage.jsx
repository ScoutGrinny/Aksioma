/* eslint-disable import/no-named-as-default */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';
import dota2 from './images/dota2.jpeg';
import wow from './images/wow.jpeg';
import csgo from './images/csgo.jpeg';
import videoWow from './Video/Трейлер World of Warcraft_ Wrath of the Lich King (online-video-cutter.com).mp4';
import videoDota from './Video/Dota 2 Gamescom Trailer (online-video-cutter.com).mp4';
import videoCsGo from './Video/CSGO.mp4';

import styles from './mainPage.module.css';
import Sliders from './Sliders/Sliders';
import Footer from '../Footer/Footer';

export default function MainPage() {
  return (
    <>
       <div className={styles.mainContainer}>
      <div className={styles.signWrap4}>
        <div className={styles.sign_word}>In <span>Game </span><span>Store </span>

        </div>
      </div>
      <div className={styles.signWrap5}>
        <div className={styles.sign_word}><span>Only </span>Top <span>Games </span>
        </div>
      </div>
      <Sliders />
    <div className={styles.wrapper}>
    <div className={styles.videoDiv}>
      <Link to="/dota2">
     {/* <img className={styles.imgCard} src="http://localhost:3001/public/images/dota-2girl.jpeg" alt="dota2" /> */}
     <video
       className={`${styles.videoWow} ${styles.videoDota}`}
       src={videoDota}
       onMouseOver={(event) => event.target.play()}
       onMouseOut={(event) => event.target.pause()}
       muted
       loop
     />
      </Link>
    </div>
    <div className={styles.videoDiv}>
    <Link to="/csgo">
      {/* <img className={styles.imgCard} src={csgo} alt="csgo" /> */}
      {/* <video className={styles.videoWow} src={videoCsGo} autoPlay loop muted /> */}
      <video
        className={styles.videoWow}
        src={videoCsGo}
        onMouseOver={(event) => event.target.play()}
        onMouseOut={(event) => event.target.pause()}
        loop
        muted
      />
    </Link>
    </div>
    <div>
      <Link className={styles.wowContainer} to="/wow">
      {/* <img className={styles.imgCard} src={wow} alt="Word of Warcraft" /> */}
      <div className={styles.containerVideo}>
      <video
        className={styles.videoWow}
        src={videoWow}
        onMouseOver={(event) => event.target.play()}
        onMouseOut={(event) => event.target.pause()}
        loop
        muted
      />
      </div>

      </Link>
    </div>
    </div>
       </div>
    <Footer />
    </>

  );
}
