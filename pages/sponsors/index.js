import * as React from 'react';
import styles from './Sponsor.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function Sponsors() {
  const LOGO_URL = 'https://cdn.discordapp.com/attachments/872003128361369603/1026238647290310656/unknown.png';
  const SPONSOR_URL = 'https://www.shell.com/';

  return (
    <div className={styles.Main}>
      <div id={styles.header}>Sponsors</div>
      <div className={styles.box}>
        <div className={styles.header}>Title Sponsor</div>
        <div className={styles.imgContainer}>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.header}>Beverages Partner</div>
        <div className={styles.imgContainer}>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.header}>Payment Partner</div>
        <div className={styles.imgContainer}>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.header}>Merchandise Partner</div>
        <div className={styles.imgContainer}>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.header}>Gear Partner</div>
        <div className={styles.imgContainer}>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
          <div className={styles.partners}>
            <a href={SPONSOR_URL}>
              <img className={styles.image} src={LOGO_URL}></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sponsors;
