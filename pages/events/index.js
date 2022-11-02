import TwoHeadingSelector from '../../Components/TwoHeadingSelector/TwoHeadingSelector';

const competitions = () => {
  return (
    <TwoHeadingSelector
      leftImageUrl="https://i.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0"
      rightImageUrl="https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
      leftRoute="/eventList"
      rightRoute="/eventList"
      leftName="Workshops"
      rightName="Megashows"
    />
  );
};

export default competitions;
