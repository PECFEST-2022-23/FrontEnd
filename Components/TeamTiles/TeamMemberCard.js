import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CallIcon from '@mui/icons-material/Call';
import Image from 'next/image';
import styles from './TeamMemberCard.module.css';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import puneet from './puneet.jpeg';

function TeamMemberCard(props) {
  // const lineColors = ['red', 'green', 'blue', 'yellow'];
  // const color = lineColors[index % 4];
  return (
    <Grid item xs={12} md={3} sm={6}>
      <div className={styles.container}>
        <div className={`${styles.center}`}>
          <div className={styles.front_face}>
            <Image
              src={props.image}
              alt={props.Name}
              layout="fill"
              className={styles.front_face}
            />
            {/* <div className={`${styles.contents} ${styles.front}`}>
              <span>{props.committee}</span>
            </div> */}
          </div>
          <div className={styles.back_face}>
            <div className={`${styles.contents} ${styles.back}`}>
              <h2>{props.name}</h2>
              <span>{props.committee}</span>
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
                  <a
                    href={`tel:${props.contact}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Tooltip title={props.contact}>
                      <CallIcon className={styles.fab} />
                    </Tooltip>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default TeamMemberCard;
