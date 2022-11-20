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
  var shareUrl;
  var shareTitle;
  var shareHashtag;
  if (props.shareType === 'event') {
    shareUrl = frontendBaseUrl + 'eventList/' + props.eventId;
    shareTitle = 'Are you attending ' + props.eventName + ' in Pecfest 2022 ?';
    shareHashtag = '#Pecfest22';
  } else {
    shareUrl =
      process.env.NEXT_PUBLIC_URL +
      `eventList/${props.eventId}` +
      '/?tid=' +
      props.teamId;
    shareTitle =
      'Is team ' +
      props.teamName +
      ' ready for ride with ' +
      props.eventName +
      ' in Pecfest 2022 ?';
    shareHashtag = '#Pecfest22';
  }

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="Event-Share-Modal"
    >
      <Box sx={style}>
        <FacebookShareButton
          url={shareUrl}
          title={shareTitle}
          quote={shareTitle}
          hashtag={shareHashtag}
        >
          <FacebookIcon round={true}></FacebookIcon>
        </FacebookShareButton>
        <LinkedinShareButton url={shareUrl} title={shareTitle}>
          <LinkedinIcon round></LinkedinIcon>
        </LinkedinShareButton>
        <WhatsappShareButton url={shareUrl} title={shareTitle} separator={'\n'}>
          <WhatsappIcon round={true}></WhatsappIcon>
        </WhatsappShareButton>
        <TelegramShareButton url={shareUrl} title={shareTitle}>
          <TelegramIcon round></TelegramIcon>
        </TelegramShareButton>
        <RedditShareButton url={shareUrl} title={shareTitle}>
          <RedditIcon round></RedditIcon>
        </RedditShareButton>
      </Box>
    </Modal>
  );
}

export default ShareComponent;
