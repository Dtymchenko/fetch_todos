import { createSlice } from "@reduxjs/toolkit";
import { IGitHubIssue } from "../../interface";
import { IMoveItem } from "../../interface";

interface initialState {
  inputValue: string;
  todosTodo: IGitHubIssue[];
  todosInProgress: IGitHubIssue[];
  todosDone: IGitHubIssue[];
  helper: boolean;
  REPO_URL: string;
}

const initialState: initialState = {
  inputValue: "",
  todosTodo: [],
  todosInProgress: [],
  todosDone: [],
  helper: false,
  REPO_URL: "",
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setInputValue(state, action) {
      state.inputValue = action.payload;
    },
    setNullStorage(state) {
      state.todosTodo = [];
      state.todosInProgress = [];
      state.todosDone = [];
    },
    setHelper(state) {
      state.helper = !state.helper;
    },
    moveItem(state, action) {
      state.todosTodo = action.payload.todosTodo.items;
      state.todosInProgress = action.payload.todosInProgress.items;
      state.todosDone = action.payload.todosDone.items;

      console.log("moveItemLocalStorage works");

      const storage = JSON.parse(localStorage.getItem(state.REPO_URL) || "{}");
      const data = {
        todosTodo: action.payload.todosTodo.items,
        todosInProgress: action.payload.todosInProgress.items,
        todosDone: action.payload.todosDone.items,
        // todosTodo: state.todosTodo,
        // todosInProgress: state.todosInProgress,
        // todosDone: state.todosDone,
      };
      console.log("storage", storage);
      console.log("data", data);
      localStorage.setItem(state.REPO_URL, JSON.stringify(data));
      console.log("storage saved to local storage");
      console.log("storage", storage);
      console.log("data", data);
    },
    setTodos(state, action) {
      state.REPO_URL = action.payload[0].repository_url;
      if (localStorage.getItem(state.REPO_URL) === null) {
        const data = {
          todosTodo: action.payload,
          todosInProgress: [],
          todosDone: [],
        };
        localStorage.setItem(state.REPO_URL, JSON.stringify(data));
        state.todosTodo = action.payload;
      } else {
        let storage = JSON.parse(localStorage.getItem(state.REPO_URL) || "{}");
        action.payload.forEach((todo: IGitHubIssue) => {
          if (
            storage?.todosInProgress?.some(
              (item: IGitHubIssue) => item.title === todo.title
            )
          ) {
            state.todosInProgress = [...state.todosInProgress, todo];
          } else if (
            storage?.todosDone?.some(
              (item: IGitHubIssue) => item.title === todo.title
            )
          ) {
            state.todosDone = [...state.todosDone, todo];
          } else {
            state.todosTodo = [...state.todosTodo, todo];
          }
        });
        const data = {
          todosTodo: state.todosTodo,
          todosInProgress: state.todosInProgress,
          todosDone: state.todosDone,
        };
        localStorage.setItem(state.REPO_URL, JSON.stringify(data));
      }
    },
  },
});

export const { setInputValue, setTodos, setHelper, setNullStorage, moveItem } =
  mainSlice.actions;

export default mainSlice.reducer;
