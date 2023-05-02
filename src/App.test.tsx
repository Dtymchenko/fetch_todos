import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

describe("App", () => {
  test("renders Input and Board components", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText("ToDo")).toBeInTheDocument();
    expect(screen.getByText("Load issues")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });
});
