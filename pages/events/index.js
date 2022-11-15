import TwoHeadingSelector from '../../Components/TwoHeadingSelector/TwoHeadingSelector';
import Head from 'next/head';

const competitions = () => {
  return (
    <>
      <Head>
        <title>Pecfest 2022|Events</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <TwoHeadingSelector
        leftImageUrl="/FestPics/workshop.jpg"
        rightImageUrl="/FestPics/megashows.jpg"
        leftRoute="/eventList"
        rightRoute="/eventList"
        leftName="Workshops"
        rightName="Megashows"
      />
    </>
  );
};

export default competitions;
