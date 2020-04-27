import React from "react";
import styles from "./Heading.module.scss";
import Box from "./shared/Box";
import { Icon, Header } from "semantic-ui-react";
import { selectAuth } from "../redux/authSlice";
import { useSelector } from "react-redux";

export default function Heading({ thread }) {
  const { isAuthenticated } = useSelector(selectAuth);

  return (
    <Box justify="space-between" alignItems="center">
      <Box>
        <Icon name="comments" size="large" color="grey" />
        <Header as="h3" color="grey" className={styles["no-margin"]}>
          {thread?.totalComments ?? 0} comments
        </Header>
      </Box>
    </Box>
  );
}
