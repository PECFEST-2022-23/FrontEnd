import React, { useState, useEffect } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CallIcon from '@mui/icons-material/Call';
import styles from './TeamMemberCard.module.css';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import puneet from './puneet.jpeg';

function TeamMemberCard(props) {
  return (
    <div className={styles.wrapper}>
      <div href="" className={styles.card}>
        <picture>
          <source srcSet={props.image} />
          <img
            src={props.image}
            className={styles.card__image}
            alt="Display Picture"
          />
        </picture>
        <div className={styles.card__overlay}>
          <div className={styles.card__header}>
            <svg
              className={styles.card__arc}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path />
            </svg>
            <picture>
              <source srcSet={props.image} />
              <img
                className={styles.card__thumb}
                src={props.image}
                alt="Display Image circle"
              />
            </picture>
            <div className={styles.card__header__text}>
              <h3 className={styles.card__title}>{props.name}</h3>
            </div>
          </div>
          <div className={styles.card__tagline}>{props.committee}</div>
          <div className={styles.icons}>
            {props.insta !== 'NA' && (
              <a href={props.insta} target="_blank" rel="noreferrer">
                <InstagramIcon className={styles.fab} />
              </a>
            )}
            {props.linkedin !== 'NA' && (
              <a href={props.linkedin} target="_blank" rel="noreferrer">
                <LinkedInIcon className={styles.fab} />
              </a>
            )}
            {props.github !== 'NA' && (
              <a href={props.github} target="_blank" rel="noreferrer">
                <GitHubIcon className={styles.fab} />
              </a>
            )}
            {props.contact !== 'NA' && (
              <a href={`tel:${props.contact}`} target="_blank" rel="noreferrer">
                <Tooltip title={props.contact}>
                  <CallIcon className={styles.fab} />
                </Tooltip>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamMemberCard;
