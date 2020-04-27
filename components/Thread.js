import React, { useState } from "react";
import { Comment } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/authSlice";
import styles from "./Thread.module.scss";
import Box from "./shared/Box";
import Heading from "./Heading";

function Thread(props) {
  const { isAuthenticated } = useSelector(selectAuth);

  const thread = props.thread.data;
  const comments = props.comments.data;

  return (
    <div id="jthread-container">
      <Comment.Group className={styles["main-comment-group"]} size="large">
        <Heading thread={thread} />
      </Comment.Group>
    </div>
  );
}

export default Thread;
