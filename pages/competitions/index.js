import TwoHeadingSelector from '../../Components/TwoHeadingSelector/TwoHeadingSelector';
import Head from 'next/head';

const competitions = () => {
  return (
    <>
      <Head>
        <title>Pecfest 2022|Competitions</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <TwoHeadingSelector
        leftImageUrl="/FestPics/technical.jpg"
        rightImageUrl="/FestPics/cultural.jpg"
        leftRoute="/eventList"
        rightRoute="/eventList"
        leftName="Technical"
        rightName="Cultural"
      />
    </>
  );
};

export default competitions;
