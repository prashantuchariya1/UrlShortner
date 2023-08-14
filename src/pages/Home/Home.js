import React from 'react';
import styles from './Home.module.css';
import MainUrlBox from '../../components/compound/mainUrlBox/MainUrlBox.js';
import Navbar from '../../components/compound/Navbar/Navbar';
function Home() {
  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      
      <p className={styles.title}>Shorten Your URL</p>
      
      <MainUrlBox />

      
    </div>
    </>
  );
}

export default Home;
