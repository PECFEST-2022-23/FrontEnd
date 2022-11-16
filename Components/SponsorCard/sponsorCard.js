import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CallIcon from '@mui/icons-material/Call';
import styles from './SponsorCard.module.css';
import Tooltip from '@mui/material/Tooltip';

function SponsorCard(props) {
  return (
    <div className={styles.wrapper}>
      <div href="" className={styles.card}>
        <picture>
          <source srcSet={props.image} />
          <img
            src={props.image}
            className={styles.card__image}
            alt={props.name}
          />
        </picture>
      </div>
    </div>
  );
}

export default SponsorCard;
