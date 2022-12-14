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
    'Title Sponsor',
    // 'Powered By',
    'Driven By',
    'Co Sponsor',
    'Associate Partner',
    'Official Hydration Partner',
    'Official Snack Partner',
    'Official Hospitality Partner',
    'Official Payment Partner',
    'Merchandise Partner',
    'Engagement Partner',
    'Experience Partner',
    'Corporate Partner',
    // 'Technical Partener',
    'Photography Partner',
    'Event Sponsors',
    'Food Partner',
  ];
  return (
    <div className={styles.background}>
      <Head>
        <title>Pecfest 2022|Sponsors</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.main_container}>
        {type.map((tp) => (
          <div key={tp} className={styles.box}>
            <div className={styles.pageheader}>{tp}</div>
            <div>
              <div className={styles.third}>
                {sponsor[`${tp}`] &&
                  sponsor[`${tp}`].map((item) => (
                    <SponsorCard
                      image={item.Logo}
                      key={item.val}
                      name={item.Name}
                    />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sponsor;
