import { IColumns, IGitHubIssue } from "../interface";

export const test1: IGitHubIssue = {
    url: "",
    repository_url: "",
    labels_url: "",
    comments_url: "",
    events_url: "",
    html_url: "",
    id: 0,
    node_id: "",
    number: 0,
    title: "Item1",
    user: {
      login: "",
      id: 0,
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
    assignee: null,
    assignees: [
      {
        login: "",
        id: 0,
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
    milestone: null,
    comments: 0,
    created_at: "",
    updated_at: "",
    closed_at: null,
    author_association: "",
    active_lock_reason: null,
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
    performed_via_github_app: null,
    state_reason: null,
  };

  export const test2: IGitHubIssue = {
    url: "",
    repository_url: "",
    labels_url: "",
    comments_url: "",
    events_url: "",
    html_url: "",
    id: 0,
    node_id: "",
    number: 0,
    title: "Item2",
    user: {
      login: "",
      id: 0,
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
    assignee: null,
    assignees: [
      {
        login: "",
        id: 0,
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
    milestone: null,
    comments: 0,
    created_at: "",
    updated_at: "",
    closed_at: null,
    author_association: "",
    active_lock_reason: null,
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
    performed_via_github_app: null,
    state_reason: null,
  };

  export const test3: IGitHubIssue = {
    url: "",
    repository_url: "",
    labels_url: "",
    comments_url: "",
    events_url: "",
    html_url: "",
    id: 0,
    node_id: "",
    number: 0,
    title: "Item3",
    user: {
      login: "",
      id: 0,
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
    assignee: null,
    assignees: [
      {
        login: "",
        id: 0,
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
    milestone: null,
    comments: 0,
    created_at: "",
    updated_at: "",
    closed_at: null,
    author_association: "",
    active_lock_reason: null,
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
    performed_via_github_app: null,
    state_reason: null,
  };

  export const columnsTest: IColumns =  {
    
        ["todosTodo"]: {
          title: "ToDo",
          id: "Todo",
          bg: "/img/bg-section-1.jpg",
          items: [test1],
        },
        ["todosInProgress"]: {
          title: "In Progress",
          id: "InProgress",
          bg: "/img/bg-section-2.jpg",
          items: [test2],
        },
        ["todosDone"]: {
          title: "Done",
          id: "Done",
          bg: "/img/bg-section-3.jpg",
          items: [test3],
        },
      };
  