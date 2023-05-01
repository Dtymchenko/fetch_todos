import { IColumns, IGitHubIssue } from "../interface";
import { v4 as uuidv4 } from "uuid";

export const ColumnsFromBackend = (
  todosTodo: IGitHubIssue[],
  todosInProcess: IGitHubIssue[],
  todosDone: IGitHubIssue[]
): IColumns => {
  return {
    [uuidv4()]: {
      title: "ToDo",
      bg: "/img/bg-section-1.jpg",
      items: todosTodo,
    },
    [uuidv4()]: {
      title: "In Progress",
      bg: "/img/bg-section-2.jpg",
      items: todosInProcess,
    },
    [uuidv4()]: {
      title: "Done",
      bg: "/img/bg-section-3.jpg",
      items: todosDone,
    },
  };
};
