import { Component } from 'react';
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
                </div>
            </div>
      </div>
    )
  }
}

export default Event;