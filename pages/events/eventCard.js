import React, { Component } from 'react';
import ReactCardFlip from 'react-card-flip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import styles from './events.module.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShareIcon from '@mui/icons-material/Share';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

class EventCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flip: false,
      eventContent: '',
      truncateIndicator: '',
      isDeviceMobile: false,
    };
  }

  setFlipForMobile() {
    if (this.state.isDeviceMobile) {
      this.setState({
        flip: !this.state.flip,
      });
    }
  }

  setFlipForDesktop(flipValue) {
    if (!this.state.isDeviceMobile) {
      this.setState({
        flip: flipValue,
      });
    }
  }

  processEventContent(eventContent) {
    const contentLength = 200;
    if (contentLength < eventContent.length) {
      this.setState({
        truncateIndicator: ' .... View more',
      });
    }
    let trimmedContent = eventContent.substring(0, contentLength);
    this.setState({
      eventContent: trimmedContent,
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
    this.processEventContent(
      "A night filled with melodious music, with sensational and worth listening performances. Don't miss the chance to wistness it go and get registered. Share this with your friends to chime them in !"
    );
  }

  resize() {
    this.setState({ isDeviceMobile: window.innerWidth <= 760 });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize.bind(this));
  }

  render() {
    return (
      <div className="col-12 col-md-6 col-lg-4 mt-4">
        <ReactCardFlip
          isFlipped={this.state.flip}
          flipDirection="horizontal"
          flipSpeedBackToFront={0.9}
          flipSpeedFrontToBack={0.9}
        >
          <Card
            onClick={() => this.setFlipForMobile()}
            onMouseEnter={() => this.setFlipForDesktop(true)}
            onMouseLeave={() => this.setFlipForDesktop(false)}
            className={styles.eventCard}
          >
            <div className={styles.borderCardMediaDiv}>
              <CardMedia
                component="img"
                height="10%"
                image="https://www.kindpng.com/picc/m/93-933681_border-frame-golden-transparent-clip-art-image-gallery.png"
                alt="green iguana"
                className={styles.borderCardMedia}
              />
              <div
                className={styles.imageCardMediaDiv}
              >
                <CardMedia
                  component="img"
                  height="400"
                  image="https://image.shutterstock.com/image-vector/urban-techno-music-event-background-600w-47546335.jpg"
                  alt="green iguana"
                  className={styles.imageCardMedia}
                />
              </div>
            </div>
          </Card>
          <Card
            onClick={() => this.setFlipForMobile()}
            onMouseEnter={() => this.setFlipForDesktop(true)}
            onMouseLeave={() => this.setFlipForDesktop(false)}
            className={styles.eventCard}
          >
            <div className={styles.borderCardMediaDiv}>
              <CardMedia
                component="img"
                height="10%"
                image="https://www.kindpng.com/picc/m/93-933681_border-frame-golden-transparent-clip-art-image-gallery.png"
                alt="green iguana"
                className={styles.borderCardMedia}
              />
              <div
                className={styles.imageCardMediaDiv}
              >
                <CardContent>
                  <p
                    className={styles.eventElementHeading}
                  >
                    Musical Night
                  </p>

                  <div className={styles.eventContentDiv}>
                    <p className={styles.eventContent}>
                      {this.state.eventContent}
                      {this.state.truncateIndicator}
                    </p>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <IconButton
                        disabled
                        className={styles.iconButton}
                      >
                        <CalendarMonthIcon />
                      </IconButton>
                      <span className={styles.eventTimePlace}>
                        2nd Nov 22, 5.30 PM
                      </span>
                    </div>
                    <div className="col-12">
                      <IconButton
                        disabled
                        className={styles.iconButton}
                      >
                        <LocationOnIcon />
                      </IconButton>
                      <span className={styles.eventTimePlace}>
                        College Auditorium{' '}
                      </span>
                    </div>
                  </div>
                  <div className="row justify-content-evenly">
                    <Button
                      variant="contained"
                      className="col-5 mt-4 mb-4 eventButton"
                      onClick={() =>
                        openInNewTab('https://www.google.com')
                      }
                      size="large"
                      color="primary"
                      startIcon={<ExitToAppIcon />}
                    >
                      Register
                    </Button>
                    <Button
                      variant="contained"
                      className="col-5 mt-4 mb-4 eventButton"
                      onClick={() =>
                        openInNewTab(
                          'https://www.google.com'
                        )
                      }
                      size="large"
                      color="primary"
                      startIcon={<ShareIcon />}
                    >
                      Share
                    </Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </ReactCardFlip>
      </div>
    );
  }
}

export default EventCard;

/*import { Component } from 'react';
import EventCard from './eventCard';

class Event extends Component {

  constructor(props){
    super(props);

    this.state={
    
    }
  }

  render(){
    return(
      <div>
        <div className='container' style={{marginTop: 50}}>
            <div className='row justify-content-evenly' style={{marginTop: 50}}>   
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard /> 
            </div>
        </div>
      </div>
    )
  }
}

export default Event;*/

{
  /*<Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image="https://image.shutterstock.com/image-vector/urban-techno-music-event-background-600w-47546335.jpg"
                alt="green iguana"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
            </Typography>
            </CardContent>
            <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
            </CardActions>
        </Card>*/
}

{
  /*<div className="col-12 col-md-6 col-lg-4 mt-4">
        <Card
          onClick={() => this.setFlipForMobile()}
          onMouseEnter={() => this.setFlipForDesktop(true)}
          onMouseLeave={() => this.setFlipForDesktop(false)}
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            boxShadow: '0 4px 8px 0 #8E3200, 0 6px 20px 0 #8E3200',
          }}
        >
          <div style={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="10%"
              image={BorderDesign}
              alt="green iguana"
              style={{ padding: 0 }}
            />
            <div
              style={{
                width: '88%',
                position: 'absolute',
                color: 'white',
                margin: 'auto',
                top: '50%',
                left: 0,
                right: 0,
                transform: 'translateY(-50%)',
              }}
            >
              <CardContent>
                <p
                  className="project-element-heading"
                  style={{ color: '#576F72', textAlign: 'center' }}
                >
                  Musical Night
                </p>

                <div style={{ marginTop: 30 }}>
                  <p style={{ color: '#576F72' }}>
                    {this.state.eventContent}
                    {this.state.truncateIndicator}
                  </p>
                </div>
                <div className="row">
                  <div className="col-12">
                    <IconButton
                      disabled
                      style={{ color: '#F1A661', marginRight: '2%' }}
                    >
                      <CalendarMonthIcon />
                    </IconButton>
                    <span style={{ color: '#576F72', fontWeight: 'bold' }}>
                      2nd Nov 22, 5.30 PM
                    </span>
                  </div>
                  <div className="col-12">
                    <IconButton
                      disabled
                      style={{ color: '#F1A661', marginRight: '2%' }}
                    >
                      <LocationOnIcon />
                    </IconButton>
                    <span style={{ color: '#576F72', fontWeight: 'bold' }}>
                      College Auditorium{' '}
                    </span>
                  </div>
                </div>
                <div className="row justify-content-evenly">
                  <Button
                    variant="contained"
                    className="col-5 mt-4 mb-4 event-button"
                    onClick={() => openInNewTab('https://github.com/Encheres')}
                    style={{ marginTop: 0 }}
                    size="large"
                    color="primary"
                    startIcon={<ExitToAppIcon />}
                  >
                    Register
                  </Button>
                  <Button
                    variant="contained"
                    className="col-5 mt-4 mb-4 event-button"
                    onClick={() =>
                      openInNewTab(
                        'https://drive.google.com/file/d/1OMfbmtQq5kYLDZs03yeDo9Mw8zR_LfIf/view?usp=sharing'
                      )
                    }
                    style={{ marginTop: 0 }}
                    size="large"
                    color="primary"
                    startIcon={<ShareIcon />}
                  >
                    Share
                  </Button>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
        <ReactCardFlip isFlipped={this.state.flip} 
                flipDirection="horizontal"
                flipSpeedBackToFront={0.9}
                flipSpeedFrontToBack={0.9}
                >
                <Card 
                    onClick={() => this.setFlipForMobile()}
                    onMouseEnter={() => this.setFlipForDesktop(true)}
                    onMouseLeave={() => this.setFlipForDesktop(false)}

                    style={{backgroundColor: '#fff', borderRadius: 10, 
                        boxShadow: '0 4px 8px 0 #8E3200, 0 6px 20px 0 #8E3200'
                    }}>
                    <div style={{position: 'relative'}}>
                        <CardMedia
                            component="img"
                            height="10%"
                            image={BorderDesign}
                            alt="green iguana"
                            style={{padding: 0}}
                        /> 
                        <div style={{width: "78%", position: 'absolute', color: "white", margin: "auto", left: 0, right: 0, top: "42%", transform: "translateY(-42%)"}}>
                            <CardMedia
                                component="img"
                                height="400"
                                image={MusicEvent}
                                alt="green iguana"
                                style={{padding: 0, borderRadius: 10}}
                            />
                        </div>
                    </div>
                </Card>
                <Card 
                    onClick={() => this.setFlipForMobile()}
                    onMouseEnter={() => this.setFlipForDesktop(true)}
                    onMouseLeave={() => this.setFlipForDesktop(false)}

                     style={{backgroundColor: '#fff', borderRadius: 10, 
                        boxShadow: '0 4px 8px 0 #8E3200, 0 6px 20px 0 #8E3200',
                    }}>
                    <div style={{position: 'relative'}}>
                        <CardMedia
                            component="img"
                            height="10%"
                            image={BorderDesign}
                            alt="green iguana"
                            style={{padding: 0}}
                        /> 
                        <div style={{width: "88%", position: 'absolute', color: "white", margin: "auto", top: "50%", left: 0, right: 0, transform: "translateY(-50%)"}}>
                        <CardContent>
                            <p className='project-element-heading' style={{color: '#576F72', textAlign: 'center'}}>
                                Musical Night
                            </p>
                            
                            <div style={{marginTop: 30}}>
                                <p style={{color: '#576F72'}}>
                                    {this.state.eventContent}
                                    {this.state.truncateIndicator}
                                </p>
                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    <IconButton disabled style={{color: "#F1A661",marginRight: '2%'}}>
                                        <CalendarMonthIcon /> 
                                    </IconButton>
                                    <span style={{color: "#576F72", fontWeight: 'bold'}}>2nd Nov 22, 5.30 PM</span>
                                </div>
                                <div className='col-12'>
                                    <IconButton disabled style={{color: "#F1A661",marginRight: '2%'}}>
                                        <LocationOnIcon /> 
                                    </IconButton>
                                    <span style={{color: "#576F72", fontWeight: 'bold'}}>College Auditorium </span>
                                </div>
                            </div>
                            <div className='row justify-content-evenly'>
                                <Button variant="contained" className='col-5 mt-4 mb-4 event-button' 
                                    onClick={() => openInNewTab('https://github.com/Encheres')} 
                                    style={{marginTop: 0}} size="large" color='primary' startIcon={<ExitToAppIcon />}>
                                    Register
                                </Button>
                                <Button variant="contained"  className='col-5 mt-4 mb-4 event-button' 
                                    onClick={() => openInNewTab('https://drive.google.com/file/d/1OMfbmtQq5kYLDZs03yeDo9Mw8zR_LfIf/view?usp=sharing')} 
                                    style={{marginTop: 0}} size="large" color='primary' startIcon={<ShareIcon />}>
                                    Share
                                </Button>
                            </div>
                        </CardContent>
                        </div>
                    </div>
                    
                </Card>
                </ReactCardFlip>
                </div>*/
}
