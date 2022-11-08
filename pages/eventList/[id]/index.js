import Event from '../../../Components/Event/Event';
import classes from './event.module.css';

const EventDetails = (props) => {
  return (
    <section style={{ minHeight: '91vh' }} className={classes.background}>
      <div suppressHydrationWarning>Ignore this</div>
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
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + 'events/' + eventId
  );
  if (!res || res.status != 200) {
    return {
      notFound: true,
    };
  }
  const eventDetails = await res.json();
  return {
    props: {
      eventDetails: eventDetails,
    },
    revalidate: 100,
  };
}

export default EventDetails;
