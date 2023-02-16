import React from "react";
import TinderCard from "react-tinder-card";
interface Iprops {}

const Demo = React.memo(function Demo(props: Iprops) {
  const onSwipe = (direction: string) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier: string) => {
    console.log(myIdentifier + " left the screen");
  };
  return (
    <TinderCard
      onSwipe={onSwipe}
      onCardLeftScreen={() => onCardLeftScreen("fooBar")}
      preventSwipe={["right", "left"]}
    >
      Hello, World!
    </TinderCard>
  );
});

export default Demo;
