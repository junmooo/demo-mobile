import { CardStyle, Message } from "@/custom_types/message";
import moment from "moment";
import { RefObject } from "react";
import TinderCard from "react-tinder-card";

type Iprops = {
  data: Message[];
  currentIndexRef: RefObject<HTMLElement> | any;
  updateCurrentIndex: (idx: number) => void;
  childRefs: RefObject<HTMLElement>[];
};

const ContentRender = (props: Iprops) => {
  const { childRefs, data, currentIndexRef, updateCurrentIndex } = props;

  const onCardLeftScreen = (myIdentifier: string) => {
    console.log(`(${myIdentifier}) left the screen!`, currentIndexRef.current);
  };

  const onSwipe = (
    direction: string,
    id: String | undefined,
    index: number
  ) => {
    console.log("You swiped: id : " + id + direction);
    updateCurrentIndex(index - 1);
  };

  const cardStyle = (item: Message) => {
    const styleObj: CardStyle = JSON.parse(item.style || "{}");
    return {
      transform: `rotate(${styleObj.angle}deg)`,
      boxShadow: `3px 3px 5px ${styleObj.sdc}`,
      backgroundColor: `${styleObj.bgc}`,
      color: `${styleObj.ftc}`,
    };
  };
  return (
    <>
      {data?.map((item, index) => {
        return (
          <TinderCard
            ref={childRefs[index] as any}
            key={item.id}
            className="tinder-card"
            onSwipe={(direction) => onSwipe(direction, item.id, index)}
            onCardLeftScreen={() => onCardLeftScreen(String(item.id))}
          >
            <div className="carousel-item" style={cardStyle(item)}>
              <div className="message">{item.messageContent}</div>
              <div className="footer">
                <div>{`${item.authorName} / ${moment(item.createdTime).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}`}</div>
              </div>
            </div>
          </TinderCard>
        );
      })}
    </>
  );
};

export default ContentRender;
