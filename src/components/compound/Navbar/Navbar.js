import React from 'react';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>URL Short</div>
      <a href="#" className={styles['contact-button']}>Contact Us</a>
    </nav>
  );
}

export default Navbar;
