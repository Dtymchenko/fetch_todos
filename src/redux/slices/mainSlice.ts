import { createSlice } from "@reduxjs/toolkit";
import { IGitHubIssue } from "../../interface";

interface initialState {
  inputValue: string;
  todosTodo: IGitHubIssue[];
  todosInProcess: IGitHubIssue[];
  todosDone: IGitHubIssue[];
  helper: boolean;
}

const initialState: initialState = {
  inputValue: "",
  todosTodo: [],
  todosInProcess: [],
  todosDone: [],
  helper: false,
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
      state.todosInProcess = [];
      state.todosDone = [];
    },
    setHelper(state) {
      state.helper = !state.helper;
    },
    setTodos(state, action) {
      const REPO_URL = action.payload[0].repository_url;
      if (localStorage.getItem(REPO_URL) === null) {
        const data = {
          todosTodo: action.payload,
          todosInProcess: [],
          todosDone: [],
        };
        localStorage.setItem(REPO_URL, JSON.stringify(data));
        state.todosTodo = action.payload;
      } else {
        let storage = JSON.parse(localStorage.getItem(REPO_URL) || "{}");
        action.payload.forEach((todo: IGitHubIssue) => {
          if (
            storage?.todosInProcess?.some(
              (item: IGitHubIssue) => item.title === todo.title
            )
          ) {
            state.todosInProcess = [...state.todosInProcess, todo];
          } else if (
            storage?.todosDone?.some(
              (item: IGitHubIssue) => item.title === todo.title
            )
          ) {
            state.todosDone = [...state.todosDone, todo];
          }
          //  else if (
          //   storage?.todosTodo?.some(
          //     (item: IGitHubIssue) => item.title === todo.title
          //   )
          // ) {
          //   state.todosTodo = [...state.todosTodo, todo];
          // }
          else {
            state.todosTodo = [...state.todosTodo, todo];
          }
        });
        const data = {
          todosTodo: state.todosTodo,
          todosInProcess: state.todosInProcess,
          todosDone: state.todosDone,
        };
        localStorage.setItem(REPO_URL, JSON.stringify(data));
      }
    },
    // setTodosTodo(state, action) {
    //   state.todos = action.payload;
    //   console.log(action.payload[0].repository_url);
    //   if (localStorage.getItem(action.payload.repository_url) === null) {
    //     localStorage.setItem(
    //       action.payload[0].repository_url,
    //       JSON.stringify(action.payload)
    //     );
    //     console.log("saved all todos to localstorage");
    //   }
    // },
  },
});

export const { setInputValue, setTodos, setHelper, setNullStorage } =
  mainSlice.actions;

export default mainSlice.reducer;
