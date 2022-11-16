import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CallIcon from '@mui/icons-material/Call';
import styles from './SponsorCard.module.css';
import Tooltip from '@mui/material/Tooltip';

function SponsorCard(props) {
  return (
    // <Grid item xs={12} md={3} sm={6} className={styles.card}>
    //   <div className={styles.container}>
    //     <div className={`${styles.center} ${styles.front_face}`}>
    //       <Card sx={{ maxWidth: 345 }}>
    //         <CardActionArea>
    //           <CardMedia
    //             component="img"
    //             height="auto"
    //             image={props.image}
    //             alt={props.name}
    //           />
    //           <CardContent className={styles.name}>
    //             <Typography gutterBottom variant="subtitle2" component="div">
    //               {props.name}
    //             </Typography>
    //           </CardContent>
    //         </CardActionArea>
    //       </Card>
    //     </div>
    //   </div>
    // </Grid>
    <div className={styles.wrapper}>
      <div href="" className={styles.card}>
        <picture>
          <source srcSet={props.image} />
          <img
            src={props.image}
            className={styles.card__image}
            alt={props.name}
          />
        </picture>
      </div>
    </div>
  );
}

export default SponsorCard;
