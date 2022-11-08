import React from 'react';
import Head from 'next/head';
import styles from './Sponsors.module.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SponsorCard from '../../Components/SponsorCard/sponsorCard';
import sponsor from './SponsorDetails.json';

function Sponsor() {
  const type = [
    'Title sponsor',
    'Powered By',
    'Co Sponsor',
    'Technical Partener',
    'Photography Partner',
  ];
  return (
    <div className={styles.background}>
      <Head>
        <title>Sponsors</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container className={styles.main_container}>
        {type.map((tp) => (
          <div key={tp}>
            <div className={styles.pageheader}>{tp}</div>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container item spacing={2} className={styles.third}>
                {sponsor[`${tp}`] &&
                  sponsor[`${tp}`].map((item) => (
                    <SponsorCard
                      image={item.Photo}
                      key={item.val}
                      name={item.Name}
                    />
                  ))}
              </Grid>
            </Box>
          </div>
        ))}
      </Container>
    </div>
  );
}

export default Sponsor;
