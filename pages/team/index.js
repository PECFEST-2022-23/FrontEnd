import React from 'react';
import Head from 'next/head';
import styles from './Team.module.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TeamMemberCard from '../../Components/TeamTiles/TeamMemberCard';
import committee from './CommitteeDetails.json';

function Team() {
  return (
    <div className={styles.background}>
      <Head>
        <title>Pecfest 2022|Team</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.main_container}>
        <div>
          <div className={styles.pageheader}>Conveners</div>
          <div>
            <div className={styles.third}>
              {committee.convener &&
                committee.convener.map((item) => (
                  <TeamMemberCard
                    image={item.Photo}
                    key={item.val}
                    name={item.Name}
                    committee={item.Committee}
                    insta={item.Instagram}
                    linkedin={item.Linkedin}
                    contact={item.Contact}
                    github="NA"
                  />
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className={styles.pageheader}>Secretaries</div>
          <div>
            <div className={styles.third}>
              {committee.secretary.map((item) => (
                <TeamMemberCard
                  image={item.Photo}
                  key={item.val}
                  name={item.Name}
                  committee={item.Committee}
                  insta={item.Instagram}
                  linkedin={item.Linkedin}
                  contact={item.Contact}
                  github="NA"
                />
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className={styles.pageheader}>Heads</div>
          <div>
            <div className={styles.third}>
              {committee.head.map((item) => (
                <TeamMemberCard
                  image={item.Photo}
                  key={item.val}
                  name={item.Name}
                  committee={item.Committee}
                  insta={item.Instagram}
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
  );
}

export default Team;
