import TwoHeadingSelector from '../../Components/TwoHeadingSelector/TwoHeadingSelector';

const competitions = () => {
  return (
    <TwoHeadingSelector
      leftImageUrl="/FestPics/workshop.jpg"
      rightImageUrl="/FestPics/megashows.jpg"
      leftRoute="/eventList"
      rightRoute="/eventList"
      leftName="Workshops"
      rightName="Megashows"
    />
  );
};

export default competitions;
