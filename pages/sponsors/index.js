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
    // 'Powered By',
    // 'Driven By',
    'Associate Partner',
    // 'Co Sponsor',
    'Corporate Partner',
    'Engagement Partner',
    // 'Technical Partener',
    // 'Photography Partner',
    'Event Sponsors',
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
