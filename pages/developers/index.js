import React from 'react';
import Head from 'next/head';
import styles from './Developers.module.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TeamMemberCard from '../../Components/TeamTiles/TeamMemberCard';
import developers from './DeveloperDetails.json';

function Developers() {
  return (
    <div className={styles.background}>
      <Head>
        <title>Pecfest 2022|Developers</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.main_container}>
        <div>
          <div className={styles.pageheader}>Frontend Developers</div>
          <div>
            <div className={styles.third}>
              {developers.frontend.map((item) => (
                <TeamMemberCard
                  image={item.Photo}
                  key={item.val}
                  name={item.Name}
                  committee={item.Designation}
                  insta={item.Insta}
                  linkedin={item.Linkedin}
                  contact={item.Contact}
                  github={item.Github}
                />
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className={styles.pageheader}>Backend Developers</div>
          <div>
            <div className={styles.third}>
              {developers.backend.map((item) => (
                <TeamMemberCard
                  image={item.Photo}
                  key={item.val}
                  name={item.Name}
                  committee={item.Designation}
                  insta={item.Insta}
                  linkedin={item.Linkedin}
                  contact={item.Contact}
                  github="NA"
                />
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className={styles.pageheader}>UI/UX Designers</div>
          <div>
            <div>
              <div className={styles.third}>
                {developers.ui.map((item) => (
                  <TeamMemberCard
                    image={item.Photo}
                    key={item.val}
                    name={item.Name}
                    committee={item.Designation}
                    insta={item.Insta}
                    linkedin={item.Linkedin}
                    contact={item.Contact}
                    github="NA"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Developers;
