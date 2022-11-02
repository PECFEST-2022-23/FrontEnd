import React from 'react';
import styles from './Team.module.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TeamMemberCard from '../../Components/TeamTiles/TeamMemberCard';
import committee from './CommitteeDetails.json';

function Team() {
  // comite = [
  //   "Alumni & Industry Relations",
  //   "Creative",
  //   "Event Coord (Cultural)",
  //   "Event Coord (Technical)",
  //   "Finance",
  //   "Hospitality & Logistics",
  //   "Infrastructure",
  //   "Marketing",
  //   "Mega Shows",
  //   "Printing, Publishing and Stationary",
  //   "Public Relations & Media",
  //   "Publicity",
  //   "Security & Discipline"

  // ]

  return (
    <div className={styles.background}>
      <Container fluid className={styles.main_container}>
        <div>
          <div className={styles.pageheader}>Conveners</div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
              <Grid container item spacing={2}>
                <TeamMemberCard />
              </Grid>
            </Grid>
          </Box>
        </div>
        <div>
          <div className={styles.pageheader}>Secretaries</div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container item spacing={2} className={styles.third}>
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
            <Grid container spacing={1}>
              <Grid container item spacing={2} className={styles.third}>
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
            </Grid>
          </Box>
        </div>
      </Container>
    </div>
  );
}

export default Team;
