import { createSlice } from "@reduxjs/toolkit";
import { IGitHubIssue } from "../../interface";

interface initialState {
  inputValue: string;
  todos: IGitHubIssue[];
  todosTodo: IGitHubIssue[];
  todosInProcess: IGitHubIssue[];
  todosDone: IGitHubIssue[];
}

const initialState: initialState = {
  inputValue: "",
  todos: [],
  todosTodo: [],
  todosInProcess: [],
  todosDone: [],
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setInputValue(state, action) {
      state.inputValue = action.payload;
    },
    setTodos(state, action) {
      state.todos = action.payload;
    },
  },
});

export const { setInputValue, setTodos } = mainSlice.actions;

export default mainSlice.reducer;
