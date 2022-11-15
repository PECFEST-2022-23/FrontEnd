import React from 'react';
import styles from './Loader.module.css';
import Head from 'next/head';

const Loader = () => {
  return <div className={styles.loader_container}><Head>
  <title>Loading...</title>
  <meta name="viewport" content="initial-scale=1.0, width=device-width" />
</Head></div>;
};

export default Loader;
