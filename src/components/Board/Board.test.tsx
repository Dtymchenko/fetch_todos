import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import Board from "./Board";
import { store } from "../../redux/store";

describe("Board component", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <Board />
      </Provider>
    );
  });
});
