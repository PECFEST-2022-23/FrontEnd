import { useRouter } from 'next/router';
import { useEffect } from 'react';
import GradientBackground from '../../../Components/Backgrounds/GradientBackground';
import Event from '../../../Components/Event/Event';

const EventDetails = (props) => {
  return (
    <GradientBackground>
      <section style={{ minHeight: '91vh' }}>
        <Event eventDetails={props.eventDetails} />
      </section>
    </GradientBackground>
  );
};

export async function getServerSideProps(context) {
  const eventId = context.params.id;
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + 'events/');
  if (!res || res.status != 200) {
    return {
      notFound: true,
    };
  }
  const eventDetails = await res.json();

  return {
    props: { eventDetails: eventDetails[0] },
  };
}

export default EventDetails;
