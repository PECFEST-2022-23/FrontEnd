import GradientBackground from '../../../Components/Backgrounds/GradientBackground';
import Event from '../../../Components/Event/Event';
import classes from './event.module.css';

const EventDetails = (props) => {
  return (
    <section style={{ minHeight: '91vh' }} className={classes.background}>
      <Event eventDetails={props.eventDetails} />
    </section>
  );
};

export async function getStaticPaths() {
  const events = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + 'events/'
  ).then((res) => res.json());

  return {
    fallback: false,
    paths: events.map((event) => {
      const eventId = event.id;
      return {
        params: {
          id: eventId,
        },
      };
    }),
  };
}

export async function getStaticProps(context) {
  const eventId = context.params.id;
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + 'events/');
  if (!res || res.status != 200) {
    return {
      notFound: true,
    };
  }
  const eventDetails = await res.json();
  console.log(eventDetails);
  return {
    props: { eventDetails: eventDetails[0] },
    revalidate: 100,
  };
}

export default EventDetails;
