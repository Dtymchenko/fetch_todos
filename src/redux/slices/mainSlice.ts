import { createSlice } from "@reduxjs/toolkit";
import { IGitHubIssue } from "../../interface";

interface initialState {
  inputValue: string;
  todosTodo: IGitHubIssue[];
  todosInProgress: IGitHubIssue[];
  todosDone: IGitHubIssue[];
  helper: boolean;
  REPO_URL: string;
}

export const initialState: initialState = {
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
      const data = {
        todosTodo: action.payload.todosTodo.items,
        todosInProgress: action.payload.todosInProgress.items,
        todosDone: action.payload.todosDone.items,
      };
      localStorage.setItem(state.REPO_URL, JSON.stringify(data));
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
            state.todosInProgress = storage?.todosInProgress.map(
              (item: IGitHubIssue) => {
                if (item.title === todo.title) {
                  return todo;
                }
                return item;
              }
            );
          }
          if (
            storage?.todosDone?.some(
              (item: IGitHubIssue) => item.title === todo.title
            )
          ) {
            state.todosDone = storage?.todosDone.map((item: IGitHubIssue) => {
              if (item.title === todo.title) {
                return todo;
              }
              return item;
            });
          }
          if (
            storage?.todosTodo?.some(
              (item: IGitHubIssue) => item.title === todo.title
            )
          ) {
            state.todosTodo = storage?.todosTodo.map((item: IGitHubIssue) => {
              if (item.title === todo.title) {
                return todo;
              }
              return item;
            });
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
