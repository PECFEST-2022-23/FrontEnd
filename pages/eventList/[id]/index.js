import Event from '../../../Components/Event/Event';
import { useRouter } from 'next/router';
import classes from './event.module.css';
import Head from 'next/head';
import Loader from '../../../Components/Loader';

const EventDetails = (props) => {
  const router = useRouter();

  if (!props.eventDetails) {
    return <Loader />;
  }

  const {
    query: { tid },
  } = router;

  return (
    <section style={{ minHeight: '91vh' }} className={classes.background}>
      <Head>
        <title>Pecfest 2022|Event</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div suppressHydrationWarning>
        <Event eventDetails={props.eventDetails} teamId={tid} />
      </div>
    </section>
  );
};

export async function getStaticPaths() {
  const events = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + 'events/'
  ).then((res) => res.json());

  return {
    fallback: 'blocking',
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
