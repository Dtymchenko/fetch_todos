import React from "react";
import styles from "./Input.module.scss";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import {
  setInputValue,
  setNullStorage,
  setTodos,
  setHelper,
} from "../../redux/slices/mainSlice";
import axios from "axios";
import { IGitHubIssue, IGitHubRepo } from "../../interface";

const Input = () => {
  const inputValue = useAppSelector((state) => state.main.inputValue);
  const dispatch = useAppDispatch();
  const [repoOwner, setRepoOwner] = React.useState<string>("");
  const [repo, setRepo] = React.useState<string>("");
  const [stars, setStars] = React.useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regex = /^https:\/\/github.com\/[\w-]+\/[\w-]+$/;
    if (!regex.test(inputValue)) {
      alert(
        "Invalid input format. Please enter a valid GitHub repo URL. Correct format: https://github.com/username/repo"
      );
      return;
    }
    setRepoOwner(inputValue.split("/")[3]);
    setRepo(inputValue);
    const getTodos = async () => {
      try {
        dispatch(setHelper());
        dispatch(setNullStorage());

        const URL: string =
          inputValue.replace("github.com", "api.github.com/repos") + "/issues";

        const response = await axios(URL);
        const data: IGitHubIssue[] = response.data;
        dispatch(setTodos(data));
      } catch (error: any) {
        console.log(error);
        alert(error.message);
      }
    };
    const getStars = async () => {
      const URL: string = inputValue.replace(
        "github.com",
        "api.github.com/repos"
      );
      const response = await axios(URL);
      const data: IGitHubRepo = response.data;
      setStars(data.stargazers_count);
    };

    getTodos();
    getStars();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputGroup className={styles.group}>
          <div className={styles.input_wrap}>
            <Form.Control
              className={styles.input}
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(setInputValue(e.target.value))
              }
              placeholder="Enter repo URL"
            />
          </div>
          <div className={styles.btn_wrap}>
            <Button
              type="submit"
              variant="outline-secondary"
              className={styles.btn}
              id="button-addon2"
            >
              Load issues
            </Button>
          </div>
        </InputGroup>
      </Form>

      {repoOwner && (
        <div className={styles.below}>
          <a target="_blank" href={`https://github.com/${repoOwner}`}>
            {repoOwner}
          </a>
          <span className={styles.divider}>{">"}</span>
          <a target="_blank" href={repo}>
            {repo.split("/").pop()}
          </a>
          <img src="/img/star.jpg" alt="star"></img>
          <span>
            {stars > 1000000
              ? `${Math.floor(stars / 1000000)} MLN`
              : stars > 1000
              ? `${Math.floor(stars / 1000)} K`
              : stars}{" "}
            stars
          </span>
        </div>
      )}
    </>
  );
};

export default Input;
