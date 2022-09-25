import React from 'react';
import styles from './Developers.module.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TeamMemberCard from '../../Components/TeamTiles/TeamMemberCard';

function Developers() {
  return (
    <div className={`vw-100 vh-100 d-flex`}>
      <Container
        fluid
        className={`d-flex flex-column overflow-hidden ${styles.main_container}`}
      >
        <div className={`d-flex flex-column flex-grow-1`}>
          <div className={`d-flex justify-content-center ${styles.pageheader}`}>
            DEVELOPERS
          </div>
          <Box
            sx={{ flexGrow: 1 }}
            className="d-flex flex-row justify-content-center"
          >
            <Grid container spacing={1}>
              <Grid container item spacing={2}>
                <TeamMemberCard />
              </Grid>
            </Grid>
          </Box>
        </div>
      </Container>
    </div>
  );
}

export default Developers;
