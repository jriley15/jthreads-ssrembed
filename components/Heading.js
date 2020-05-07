import React from "react";
import styles from "../public/styles/Heading.module.scss";
import Box from "./shared/Box";
import { Icon, Header, Dropdown } from "semantic-ui-react";
import { selectAuth } from "../redux/authSlice";
import { useSelector } from "react-redux";

export default function Heading({ thread }) {
  const { isAuthenticated } = useSelector(selectAuth);

  return (
    <Box justify="space-between" alignItems="center">
      <Box>
        <Icon name="comments" size="large" color="grey" />
        <Header as="h3" color="grey" className={styles.noMargin}>
          {thread?.totalComments ?? 0} comments
        </Header>
      </Box>
      <Dropdown
        direction="left"
        className={styles["no-margin"]}
        text={
          <Header as="h3" color="grey">
            <Box>
              <Icon name="lock" style={{ marginRight: 6, fontSize: 18 }} />
              <span>Sign in</span>
            </Box>
          </Header>
        }
        button
        labeled
      >
        <Dropdown.Menu>
          <Dropdown.Item>Test</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Box>
  );
}
