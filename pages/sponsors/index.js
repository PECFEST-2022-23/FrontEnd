import React from 'react';
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
      <Container fluid className={styles.main_container}>
        {type.map((tp) => (
          <div key={tp.val}>
            <div className={styles.pageheader}>{tp}</div>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container item spacing={2} className={styles.third}>
                {sponsor[`${tp}`] &&
                  sponsor[`${tp}`].map((item) => (
                    <SponsorCard
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
        ))}
      </Container>
    </div>
  );
}

export default Sponsor;
