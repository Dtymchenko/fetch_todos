import React from "react";
import styles from "./Board.module.scss";
import { ColumnsFromBackend } from "../../data/ColumnsFromBacked";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { IColumns, IDragResult } from "../../interface";
import Card from "../Card/Card";
import { useAppSelector } from "../../redux/redux-hooks";

const Board = () => {
  const todosTodo = useAppSelector((state) => state.main.todosTodo);
  const todosInProcess = useAppSelector((state) => state.main.todosInProcess);
  const todosDone = useAppSelector((state) => state.main.todosDone);
  const helper = useAppSelector((state) => state.main.helper);
  const [columns, setColumns] = React.useState<IColumns>(
    ColumnsFromBackend(todosTodo, todosInProcess, todosDone)
  );

  React.useEffect(() => {
    setColumns(ColumnsFromBackend(todosTodo, todosInProcess, todosDone));
  }, [todosTodo, todosInProcess, todosDone, helper]);

  const onDragEnd = (result: IDragResult, columns: IColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result, columns)}>
      <div className={styles.container}>
        <div className={styles.column}>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <div className={styles.card}>
                    <span className={styles.title}>{column.title}</span>
                    <div
                      className={styles.task}
                      style={{
                        backgroundImage: `url(${columns[columnId].bg})`,
                      }}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <div className={styles.issues}>
                        {column.items.map((item, index) => (
                          <Card key={item.id} item={item} index={index} />
                        ))}
                      </div>

                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
