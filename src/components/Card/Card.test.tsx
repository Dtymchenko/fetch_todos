import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import Card from "./Card";
import { store } from "../../redux/store";
import { IGitHubIssue } from "../../interface";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styles from "../Board/Board.module.scss";

const mockItem: IGitHubIssue = {
  url: "",
  repository_url: "",
  labels_url: "",
  comments_url: "",
  events_url: "",
  html_url: "",
  id: 1,
  node_id: "",
  number: 0,
  title: "Test issue",
  user: {
    login: "",
    id: 1,
    node_id: "",
    avatar_url: "",
    gravatar_id: "",
    url: "",
    html_url: "",
    followers_url: "",
    following_url: "",
    gists_url: "",
    starred_url: "",
    subscriptions_url: "",
    organizations_url: "",
    repos_url: "",
    events_url: "",
    received_events_url: "",
    type: "",
    site_admin: false,
  },
  labels: [
    {
      url: "",
      name: "",
      color: "",
    },
  ],
  state: "",
  locked: false,
  assignee: {
    login: "",
    id: 1,
    node_id: "",
    avatar_url: "",
    gravatar_id: "",
    url: "",
    html_url: "",
    followers_url: "",
    following_url: "",
    gists_url: "",
    starred_url: "",
    subscriptions_url: "",
    organizations_url: "",
    repos_url: "",
    events_url: "",
    received_events_url: "",
    type: "",
    site_admin: false,
  },
  assignees: [
    {
      login: "",
      id: 1,
      node_id: "",
      avatar_url: "",
      gravatar_id: "",
      url: "",
      html_url: "",
      followers_url: "",
      following_url: "",
      gists_url: "",
      starred_url: "",
      subscriptions_url: "",
      organizations_url: "",
      repos_url: "",
      events_url: "",
      received_events_url: "",
      type: "",
      site_admin: false,
    },
  ],
  milestone: "",
  comments: 3,
  created_at: "2022-04-30T10:23:39Z",
  updated_at: "",
  closed_at: "",
  author_association: "",
  active_lock_reason: "",
  body: "",
  reactions: {
    url: "",
    total_count: 0,
    "+1": 0,
    "-1": 0,
    laugh: 0,
    hooray: 0,
    confused: 0,
    heart: 0,
    rocket: 0,
    eyes: 0,
  },
  timeline_url: "",
  performed_via_github_app: "",
  state_reason: "",
};

describe("Card component", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <DragDropContext onDragEnd={() => {}}>
          <Droppable key="random-test-key" droppableId="droppable-id">
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                  <Card item={mockItem} index={0} />
                </div>
            )}

          </Droppable>
        </DragDropContext>
      </Provider>
    );
  });
});
