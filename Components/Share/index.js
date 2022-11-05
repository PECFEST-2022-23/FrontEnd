import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import { Modal, Box } from '@mui/material';
import { frontendBaseUrl } from '../../public/accessUrls';

const style = {
  borderRadius: 5,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
};

function ShareComponent(props) {
  const eventUrl = frontendBaseUrl + 'eventList/' + props.eventId;
  const eventTitle =
    'Are you attending ' + props.eventName + ' in Pecfest 2022 ?';
  const eventHashtag = '#Pecfest22';

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="Event-Share-Modal"
    >
      <Box sx={style}>
        <FacebookShareButton
          url={eventUrl}
          title={eventTitle}
          quote={eventTitle}
          hashtag={eventHashtag}
        >
          <FacebookIcon round={true}></FacebookIcon>
        </FacebookShareButton>
        <LinkedinShareButton url={eventUrl} title={eventTitle}>
          <LinkedinIcon round></LinkedinIcon>
        </LinkedinShareButton>
        <WhatsappShareButton url={eventUrl} title={eventTitle} separator={'\n'}>
          <WhatsappIcon round={true}></WhatsappIcon>
        </WhatsappShareButton>
        <TelegramShareButton url={eventUrl} title={eventTitle}>
          <TelegramIcon round></TelegramIcon>
        </TelegramShareButton>
        <TwitterShareButton
          url={eventUrl}
          title={eventTitle}
          hashtags={eventHashtag}
        >
          <TwitterIcon round></TwitterIcon>
        </TwitterShareButton>
        <RedditShareButton url={eventUrl} title={eventTitle}>
          <RedditIcon round></RedditIcon>
        </RedditShareButton>
      </Box>
    </Modal>
  );
}

export default ShareComponent;
