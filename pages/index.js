import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <section className={styles.parallax}>
        <div className={styles.parallaxBackground}>
          <picture>
            <source srcSet="/landing/Sun and Clouds.png" />
            <img
              className={styles.parallaxSunClouds}
              src="/landing/Sun and Clouds.png"
              alt="Sun and Clouds"
            />
          </picture>
          <picture>
            <source srcSet="/landing/Building Layer 3.png" />
            <img
              className={styles.parallaxBuildings2}
              src="/landing/Building Layer 3.png"
              alt="Building Layer 3"
            />
          </picture>
          <picture>
            <source srcSet="/landing/Building Layer 2.png" />
            <img
              className={styles.parallaxBuildings2}
              src="/landing/Building Layer 2.png"
              alt="Building Layer 2"
            />
          </picture>
        </div>
        <picture>
          <source srcSet="/landing/monuments.png" />
          <img
            className={styles.parallaxMonuments}
            src="/landing/monuments.png"
            alt="monuments"
          />
        </picture>
        <picture>
          <source srcSet="/landing/Plane with path.png" />
          <img
            className={styles.parallaxPlaneWithPath}
            src="/landing/Plane with path.png"
            alt="Plane with path"
          />
        </picture>
        <picture>
          <source srcSet="/landing/Pecfest.png" />
          <img
            className={styles.parallaxPecfest}
            src="/landing/Pecfest.png"
            alt="Pecfest"
          />
        </picture>
        <picture>
          <source srcSet="/landing/22.png" />
          <img
            className={styles.parallax22}
            src="/landing/22.png"
            alt="22"
          />
        </picture>
        <picture>
          <source srcSet="/landing/An indian odyssey.png" />
          <img
            className={styles.parallaxIndianOdyssey}
            src="/landing/An indian odyssey.png"
            alt="An indian odyssey"
          />
        </picture>
      </section>
      <section className={styles.about}></section>
    </>
  );
}
