import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { IGitHubIssue } from "../interface";
import mainReducer, {
  setInputValue,
  setHelper,
  setNullStorage,
  moveItem,
} from "./slices/mainSlice";
import App from "../App";
import { test1, test2, test3, columnsTest } from "../data/someVariables";

const renderWithRedux = (
  ui: React.ReactElement,
  { store = configureStore({ reducer: { main: mainReducer } }) } = {}
) => {
  return {
    ...render(
      <Provider store={store}>
        <App />
      </Provider>
    ),
    store,
  };
};

describe("setInputValue", () => {
  test("updates input value correctly", () => {
    const { store } = renderWithRedux(<App />, {});
    const testInputValue = "Test Input Value";
    store.dispatch(setInputValue(testInputValue));
    expect(store.getState().main.inputValue).toEqual(testInputValue);
  });
});

describe("setHelper", () => {
  test("toggles helper flag correctly", () => {
    const { store } = renderWithRedux(<App />, {});
    expect(store.getState().main.helper).toBeFalsy();

    store.dispatch(setHelper());
    expect(store.getState().main.helper).toBeTruthy();

    store.dispatch(setHelper());
    expect(store.getState().main.helper).toBeFalsy();
  });
});

describe("setNullStorage", () => {
  test("sets todosTodo, todosInProgress, and todosDone to empty arrays", () => {
    const { store } = renderWithRedux(<App />, {
      store: configureStore({
        reducer: { main: mainReducer },
        preloadedState: {
          main: {
            inputValue: "",
            todosTodo: [test1],
            todosInProgress: [test2],
            todosDone: [test3],
            helper: false,
            REPO_URL: "",
          },
        },
      }),
    });
    store.dispatch(setNullStorage());
    expect(store.getState().main.todosTodo).toEqual([]);
    expect(store.getState().main.todosInProgress).toEqual([]);
    expect(store.getState().main.todosDone).toEqual([]);
  });
});

describe("moveItem", () => {
  test("sets todosTodo, todosInProgress, according to action.payload", () => {
    const { store } = renderWithRedux(<App />, {
      store: configureStore({
        reducer: { main: mainReducer },
        preloadedState: {
          main: {
            inputValue: "",
            todosTodo: [],
            todosInProgress: [],
            todosDone: [],
            helper: false,
            REPO_URL: "repo",
          },
        },
      }),
    });
    localStorage.clear();
    store.dispatch(moveItem(columnsTest));
    expect(store.getState().main.todosTodo).toEqual(
      columnsTest["todosTodo"].items
    );
    expect(store.getState().main.todosInProgress).toEqual(
      columnsTest["todosInProgress"].items
    );
    expect(store.getState().main.todosDone).toEqual(
      columnsTest["todosDone"].items
    );
    expect(localStorage.getItem("repo")).toEqual(
      JSON.stringify({
        todosTodo: columnsTest["todosTodo"].items,
        todosInProgress: columnsTest["todosInProgress"].items,
        todosDone: columnsTest["todosDone"].items,
      })
    );
  });
});
