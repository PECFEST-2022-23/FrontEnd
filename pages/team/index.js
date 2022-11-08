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
        <title>Team</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container fluid className={styles.main_container}>
        <div>
          <div className={styles.pageheader}>Conveners</div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container item className={styles.third}>
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
            </Grid>
          </Box>
        </div>
        <div>
          <div className={styles.pageheader}>Secretaries</div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container item className={styles.third}>
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
            </Grid>
          </Box>
        </div>
        <div>
          <div className={styles.pageheader}>Heads</div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container item className={styles.third}>
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
            </Grid>
          </Box>
        </div>
      </Container>
    </div>
  );
}

export default Team;
