import { render, fireEvent, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import Input from "./Input";
import { setInputValue } from "../../redux/slices/mainSlice";

const mockStore = configureStore([]);

jest.mock("axios");
window.alert = jest.fn();

describe("Input", () => {
  let store: ReturnType<typeof mockStore>;
  beforeEach(() => {
    store = mockStore({
      main: {
        inputValue: "",
        todos: [],
        helper: null,
        storage: null,
      },
    });
  });

  test("renders input and button", () => {
    render(
      <Provider store={store}>
        <Input />
      </Provider>
    );
    const inputElement = screen.getByPlaceholderText("Enter repo URL");
    expect(inputElement).toBeInTheDocument();
    const buttonElement = screen.getByRole("button", { name: "Load issues" });
    expect(buttonElement).toBeInTheDocument();
  });

  test("dispatches setInputValue action on input change", () => {
    render(
      <Provider store={store}>
        <Input />
      </Provider>
    );
    const inputElement = screen.getByPlaceholderText("Enter repo URL");
    act(() => {
      fireEvent.change(inputElement, {
        target: { value: "https://github.com/test/test" },
      });
    });
    expect(store.getActions()).toContainEqual(
      setInputValue("https://github.com/test/test")
    );
  });

  test("shows error message for invalid input format", () => {
    render(
      <Provider store={store}>
        <Input />
      </Provider>
    );
    const inputElement = screen.getByPlaceholderText("Enter repo URL");
    act(() => {
      fireEvent.change(inputElement, {
        target: { value: "myrepo" },
      });
    });
    const buttonElement = screen.getByTestId("load-issues-button");
    fireEvent.click(buttonElement);
    expect(window.alert).toHaveBeenCalledTimes(1);
  });
});
