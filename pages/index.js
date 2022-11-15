import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';

export default function Home() {
  const [offsetY, setOffsetY] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);

  const carouselSettings = {
    speed: 400,
    slidesToShow: 3,
    slidesToSwipe: 4,
    centerMode: true,
    centerPadding: '20px',
    arrows: false,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnFocues: false,
    infinite: true,
    beforeChange: (current, next) => setImgIndex(next),
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          infinite: true,
        },
      },
    ],
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => setOffsetY(window.pageYOffset);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className={styles.landing}>
      <Head>
        <title>Pecfest 2022|Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <section className={styles.parallax}>
        <div className={styles.parallaxBackground}>
          <picture>
            <source srcSet="/landing/SunAndClouds.png" />
            <img
              className={styles.parallaxSunClouds}
              style={{ transform: `translateY(${offsetY * 0.6}px)` }}
              src="/landing/SunAndClouds.png"
              alt="Sun and Clouds"
            />
          </picture>
          <picture>
            <source srcSet="/landing/BuildingLayer3.png" />
            <img
              className={styles.parallaxBuildings3}
              style={{ transform: `translateY(${offsetY * 0.5}px)` }}
              src="/landing/BuildingLayer3.png"
              alt="Building Layer 3"
            />
          </picture>
          <picture>
            <source srcSet="/landing/BuildingLayer2.png" />
            <img
              className={styles.parallaxBuildings2}
              style={{ transform: `translateY(${offsetY * 0.3}px)` }}
              src="/landing/BuildingLayer2.png"
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
          <source srcSet="/landing/planeWithPath.png" />
          <img
            className={styles.parallaxPlaneWithPath}
            style={{ transform: `translateY(${offsetY * 0.4}px)` }}
            src="/landing/planeWithPath.png"
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
          <source srcSet="/landing/AnIndianOdyssey.png" />
          <img
            className={styles.parallaxIndianOdyssey}
            src="/landing/AnIndianOdyssey.png"
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
        <div className={styles.festMegashowsHeader}>
          <span>
            {
              "Raising the bar of stellar events, PECFEST'22 brings you an array of roof raisers"
            }
          </span>
        </div>
        <div className={styles.carousel}>
          <Slider {...carouselSettings}>
            {[
              ['GuruRandhawa.jpg', 'Guru Randhawa'],
              ['JavedAli.JPG', 'Javed Ali'],
              ['SaraSantini.JPG', 'DJ Sara Santini'],
              ['TheYellowDiaries.JPG', 'The Yellow Diary'],
            ].map((img, idx) => (
              <div
                key={idx}
                className={
                  idx === imgIndex
                    ? `${styles.slide} ${styles.activeSlide}`
                    : `${styles.slide}`
                }
              >
                <picture>
                  <source srcSet={'/FestPics/' + img[0]} />
                  <img src={'/FestPics/' + img[0]} alt={idx} />
                </picture>
                <div className={styles.starName}>{img[1]}</div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
      <section className={styles.about5}></section>
    </div>
  );
}
