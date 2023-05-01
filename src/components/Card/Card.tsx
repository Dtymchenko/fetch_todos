import React from "react";
import styles from "./Card.module.scss";
import { Draggable } from "react-beautiful-dnd";
import { IGitHubIssue } from "../../interface";
import { intlFormatDistance } from "date-fns";

interface CardProps {
  item: IGitHubIssue;
  index: number;
}

const Card: React.FC<CardProps> = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={styles.task}>
            <p className={styles.title}>{item.title}</p>
            <div className={styles.details}>
              <p>#{item.number}</p>
              <p>
                <span>
                  {/* {new Date(item.created_at).toLocaleDateString("en-us", {
                    month: "short",
                    day: "2-digit",
                  })} */}
                  opened{" "}
                  {intlFormatDistance(new Date(item.created_at), Date.now(), {
                    locale: "en",
                  })}
                </span>
              </p>
            </div>
            <div className={styles.bottom}>
              <span>Admin</span>
              <span className={styles.divider}>|</span>
              <span>Comments: {item.comments}</span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
