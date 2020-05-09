import React, { useState } from "react";
import { Divider, Comment as SemanticComment } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/authSlice";
import styles from "../public/styles/Thread.module.scss";
import Box from "./shared/Box";
import Heading from "./Heading";
import Stats from "./Stats";
import Filters from "./Filters";
import CreateComment from "./CreateComment";
import { selectThread } from "../redux/threadSlice";
import Comments from "./Comments";

function Thread() {
  const { isAuthenticated } = useSelector(selectAuth);
  const { thread } = useSelector(selectThread);

  return (
    <div id="jthread-container">
      <SemanticComment.Group className={styles.mainCommentGroup} size="large">
        <Heading thread={thread} />
        <Divider />
        <Box justify="space-between" alignItems="flex-start">
          <Stats thread={thread} />
          <Filters />
        </Box>
        <Box mt={1}>
          <CreateComment />
        </Box>
        <Comments />
      </SemanticComment.Group>
    </div>
  );
}

export default Thread;
