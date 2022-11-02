import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => setOffsetY(window.pageYOffset);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <>
      <section className={styles.parallax}>
        <div className={styles.parallaxBackground}>
          <picture>
            <source srcSet="/landing/Sun and Clouds.png" />
            <img
              className={styles.parallaxSunClouds}
              style={{ transform: `translateY(${offsetY * 0.6}px)` }}
              src="/landing/Sun and Clouds.png"
              alt="Sun and Clouds"
            />
          </picture>
          <picture>
            <source srcSet="/landing/Building Layer 3.png" />
            <img
              className={styles.parallaxBuildings3}
              style={{ transform: `translateY(${offsetY * 0.5}px)` }}
              src="/landing/Building Layer 3.png"
              alt="Building Layer 3"
            />
          </picture>
          <picture>
            <source srcSet="/landing/Building Layer 2.png" />
            <img
              className={styles.parallaxBuildings2}
              style={{ transform: `translateY(${offsetY * 0.3}px)` }}
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
          <source srcSet="/landing/plane with path.png" />
          <img
            className={styles.parallaxPlaneWithPath}
            style={{ transform: `translateY(${offsetY * 0.4}px)` }}
            src="/landing/plane with path.png"
            alt="Plane with path"
          />
        </picture>
        <picture>
          <source srcSet="/landing/Pecfest.png" />
          <img
            className={styles.parallaxPecfest}
            style={{ transform: `translateY(-${offsetY * 0.1}px)` }}
            src="/landing/Pecfest.png"
            alt="Pecfest"
          />
        </picture>
        <picture>
          <source srcSet="/landing/22.png" />
          <img
            className={styles.parallax22}
            style={{ transform: `translateY(-${offsetY * 0.1}px)` }}
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
      <section className={styles.about}>
        <div className={styles.aboutBlur}>
          <div className={styles.aboutHeader}>ABOUT</div>
          <div className={styles.aboutDescription}>
            PECFEST is a three-day annual techno-cultural fest that combines
            technology and culture to show the synergy between the two. A
            confluence of art, talent, and attractions, it aims to inculcate
            passion and industriousness through events organized at an
            avant-garde level. This fest is known for setting an unparalleled
            benchmark.
          </div>
        </div>
      </section>
      <section className={styles.about2}></section>
      <section className={styles.about3}></section>
      <section className={styles.about4}></section>
      <section className={styles.about5}></section>
    </>
  );
}
