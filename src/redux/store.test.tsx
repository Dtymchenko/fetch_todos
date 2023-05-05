import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import mainReducer, { setInputValue, setHelper } from "./slices/mainSlice";
import App from "../App";

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
