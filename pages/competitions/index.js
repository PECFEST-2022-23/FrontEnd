import TechCulturalSelector from '../../components/TechCulturalSelector';

const competitions = () => {
  return (
    <TechCulturalSelector
      technicalImageUrl="https://i.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0"
      culturalImageUrl="https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
      leftRoute="/competitions/technical"
      rightRoute="/competitions/cultural"
    />
  );
};

export default competitions;
