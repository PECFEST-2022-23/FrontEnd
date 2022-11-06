import TwoHeadingSelector from '../../Components/TwoHeadingSelector/TwoHeadingSelector';

const competitions = () => {
  return (
    <TwoHeadingSelector
      leftImageUrl="/FestPics/technical.jpg"
      rightImageUrl="/FestPics/cultural.jpg"
      leftRoute="/eventList"
      rightRoute="/eventList"
      leftName="Technical"
      rightName="Cultural"
    />
  );
};

export default competitions;
