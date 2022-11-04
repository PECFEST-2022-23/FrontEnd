import React from 'react';
import styles from './Loader.module.css';
import Alpha_Loader from '../../public/loader/Alpha_Loader.gif';
import Image from 'next/image';

const Loader = () => {
  return (
    <div className={styles.loader_container}>
        {/* <Image src={Alpha_Loader} alt="Loader" /> */}
    </div>
  );
};

export default Loader;
