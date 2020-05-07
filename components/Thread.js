import React, { useState } from "react";
import { Comment, Divider } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/authSlice";
import styles from "../public/styles/Thread.module.scss";
import Box from "./shared/Box";
import Heading from "./Heading";
import Stats from "./Stats";
import Filters from "./Filters";
import CreateComment from "./CreateComment";
import Comments from "./Comments";

function Thread(props) {
  const { isAuthenticated } = useSelector(selectAuth);

  const thread = props.thread.data;
  const comments = props.comments.data;

  return (
    <div id="jthread-container">
      <Comment.Group className={styles.mainCommentGroup} size="large">
        <Heading thread={thread} />
        <Divider />
        <Box justify="space-between" alignItems="flex-start">
          <Stats thread={thread} />
          <Filters />
        </Box>
        <Box marginTop={1}>
          <CreateComment />
        </Box>
        <div className={styles.commentscontainer}>
          <Comments comments={comments} />
        </div>
      </Comment.Group>
    </div>
  );
}

export default Thread;
