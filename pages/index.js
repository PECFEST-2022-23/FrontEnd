import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Rellax from 'rellax';
import styles from '../styles/Home.module.css';

export default function Home() {

  useEffect(() => {
    var rellax = new Rellax('.rellax');
  }, []);

  return (
    <>
      <section className={styles.parallax}>
        <div className={styles.parallaxBackground}>
          <picture>
            <source srcSet="/landing/Sun and Clouds.png" />
            <img
              className={`${styles.parallaxSunClouds} rellax`}
              src="/landing/Sun and Clouds.png"
              alt="Sun and Clouds"
              data-rellax-speed="2"
            />
          </picture>
          <picture>
            <source srcSet="/landing/Building Layer 3.png" />
            <img
              className={`${styles.parallaxBuildings2} rellax`}
              src="/landing/Building Layer 3.png"
              alt="Building Layer 3"
              data-rellax-speed="3"
              data-rellax-percentage="0.5"
            />
          </picture>
          <picture>
            <source srcSet="/landing/Building Layer 2.png" />
            <img
              className={`${styles.parallaxBuildings2} rellax`}
              src="/landing/Building Layer 2.png"
              alt="Building Layer 2"
              data-rellax-speed="1"
            />
          </picture>
        </div>
        <picture>
          <source srcSet="/landing/monuments.png" />
          <img
            className={`${styles.parallaxMonuments} rellax`}
            src="/landing/monuments.png"
            alt="monuments"
            data-rellax-speed="-2"
          />
        </picture>
        <picture>
          <source srcSet="/landing/Plane with path.png" />
          <img
            className={`${styles.parallaxPlaneWithPath} rellax`}
            src="/landing/Plane with path.png"
            alt="Plane with path"
            data-rellax-speed="1"
          />
        </picture>
        <picture>
          <source srcSet="/landing/Pecfest.png" />
          <img
            className={`${styles.parallaxPecfest} rellax`}
            src="/landing/Pecfest.png"
            alt="Pecfest"
            data-rellax-speed='3'
          />
        </picture>
        <picture>
          <source srcSet="/landing/22.png" />
          <img className={`${styles.parallax22} rellax`} src="/landing/22.png" alt="22" data-rellax-speed='3' />
        </picture>
        <picture>
          <source srcSet="/landing/An indian odyssey.png" />
          <img
            className={`${styles.parallaxIndianOdyssey} rellax`}
            src="/landing/An indian odyssey.png"
            alt="An indian odyssey"
            data-rellax-speed="-1"
          />
        </picture>
      </section>
      <section className={styles.about}></section>
    </>
  );
}
