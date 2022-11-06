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
    <div className={styles.landing}>
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
          <div className={styles.aboutHeader}>{'ABOUT'}</div>
          <div className={styles.aboutDescription}>
            {
              'PECFEST is a three-day annual techno-cultural fest that combines technology and culture to show the synergy between the two. A confluence of art, talent, and attractions, it aims to inculcate passion and industriousness through events organized at an avant-garde level. This fest is known for setting an unparalleled benchmark.'
            }
          </div>
        </div>
      </section>
      <section className={styles.festPhotos}>
        <div className={styles.festThemePics}>
          <picture>
            <source srcSet="/FestPics/festTheme1.jpg" />
            <img
              className={styles.festThemePics1}
              alt="festTheme1"
              src="/FestPics/festTheme1.jpg"
            />
          </picture>
          <picture>
            <source srcSet="/FestPics/festTheme2.jpg" />
            <img
              className={styles.festThemePics2}
              alt="festTheme2"
              src="/FestPics/festTheme2.jpg"
            />
          </picture>
          <picture>
            <source srcSet="/FestPics/festTheme3.jpg" />
            <img
              className={styles.festThemePics3}
              alt="festTheme3"
              src="/FestPics/festTheme3.jpg"
            />
          </picture>
        </div>
        <div className={styles.festFlex}>
          <div>
            75K+ <span>Footfall</span>
          </div>
          <div>
            100+ <span>Events</span>
          </div>
          <div>Stunning Star Night</div>
        </div>
      </section>
      <section className={styles.festTheme}>
        <div className={styles.festThemeBlur}>
          <div className={styles.festThemeHeader}>
            {'PECFEST - An Indian Odyssey'}
          </div>
          <div className={styles.festThemeDescription}>
            {
              "The seventh-largest country is home to more cultures than one can count, each with its own style of art, cuisine, and fashion. Making it nearly impossible to experience the entirety of India's cultural richness in a single lifetime. To emphasise and celebrate this great diversity, we present our theme, An Indian Odyssey!"
            }
          </div>
        </div>
      </section>
      <section className={styles.festMegashows}>
        <div className={styles.festThemeBlur}>
          <div className={styles.festMegashowsHeader}>
            {
              "Raising the bar of stellar events, PECFEST'22 brings you an array of roof raisers"
            }
          </div>
        </div>
      </section>
      {/* <section className={styles.about5}></section> */}
    </div>
  );
}
