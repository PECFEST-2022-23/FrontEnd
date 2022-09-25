import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Image from 'next/image';
import styles from './TeamMemberCard.module.css';
import puneet from './puneet.jpeg';

function TeamMemberCard({ member, index }) {
  const lineColors = ['red', 'green', 'blue', 'yellow'];
  const color = lineColors[index % 4];
  return (
    <Grid item xs={12} md={3} sm={6}>
      <div className={styles.container}>
        <div className={`${styles.center}`}>
          <div className={styles.front_face}>
            <Image src={puneet} alt="Avatar" className={styles.front_face} />
            <div className={`${styles.contents} ${styles.front}`}>
              <p>Puneet Bansal</p>
              <span>Frontend Developer</span>
            </div>
          </div>
          <div className={styles.back_face}>
            <div className={`${styles.contents} ${styles.back}`}>
              <h2></h2>
              <span>Follow Me</span>
              <div className={styles.icons}>
                <a href="" target="_blank">
                  <InstagramIcon className={styles.fab} />
                </a>
                <a
                  href="https://www.linkedin.com/in/puneet-bansal15/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedInIcon className={styles.fab} />
                </a>
                <a
                  href="https://github.com/bansalpuneet15"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitHubIcon className={styles.fab} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default TeamMemberCard;
