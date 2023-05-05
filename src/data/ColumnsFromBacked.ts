import { IColumns, IGitHubIssue } from "../interface";
import { v4 as uuidv4 } from "uuid";

export const ColumnsFromBackend = (
  todosTodo: IGitHubIssue[],
  todosInProgress: IGitHubIssue[],
  todosDone: IGitHubIssue[]
): IColumns => {
  return {
    ["todosTodo"]: {
      title: "ToDo",
      id: "Todo",
      bg: "/img/bg-section-1.jpg",
      items: todosTodo,
    },
    ["todosInProgress"]: {
      title: "In Progress",
      id: "InProgress",
      bg: "/img/bg-section-2.jpg",
      items: todosInProgress,
    },
    ["todosDone"]: {
      title: "Done",
      id: "Done",
      bg: "/img/bg-section-3.jpg",
      items: todosDone,
    },
  };
};
