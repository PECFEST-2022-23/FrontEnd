import React from 'react';
import Head from 'next/head'
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
        <title>Developers</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container fluid className={styles.main_container}>
        <div>
          <div className={styles.pageheader}>Frontend Developers</div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container item spacing={2} className={styles.third}>
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
            </Grid>
          </Box>
        </div>
        <div>
          <div className={styles.pageheader}>Backend Developers</div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container item spacing={2} className={styles.third}>
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
            </Grid>
          </Box>
        </div>
        <div>
          <div className={styles.pageheader}>UI/UX Designers</div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
              <Grid container item spacing={2} className={styles.third}>
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
              </Grid>
            </Grid>
          </Box>
        </div>
      </Container>
    </div>
  );
}

export default Developers;
