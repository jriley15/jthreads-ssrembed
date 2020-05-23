import React, { useEffect } from "react";
import styles from "../public/styles/Heading.module.scss";
import Box from "./shared/Box";
import { Icon, Header, Dropdown } from "semantic-ui-react";
import { selectAuth } from "../redux/authSlice";
import { selectThread } from "../redux/threadSlice";
import useAuth from "../hooks/useAuth";

export default function Heading({ thread }) {
  const { isAuthenticated, openJThreadsSignin, logout, claims } = useAuth();

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
        className={styles.noMargin}
        text={
          <Header as="h3" color="grey">
            <Box>
              <Icon name="lock" style={{ marginRight: 6, fontSize: 18 }} />
              <span>
                {isAuthenticated
                  ? `Signed in as ${claims?.displayName}`
                  : "Sign in"}
              </span>
            </Box>
          </Header>
        }
        button
        labeled
      >
        {!isAuthenticated ? (
          <Dropdown.Menu>
            <Dropdown.Item
              text={
                <>
                  <Icon name="comments" />
                  JThreads
                </>
              }
              onClick={() => {
                openJThreadsSignin();
              }}
            />
            <Dropdown.Item
              text={
                <span style={{ display: "flex", alignItems: "center" }}>
                  <img
                    style={{
                      width: "1em",
                      marginRight: "1rem",
                    }}
                    src="https://cdn.aircomechanical.com/wp-content/uploads/2018/12/google-review-button.png"
                  />{" "}
                  Google
                </span>
              }
            />
            <Dropdown.Item text="Facebook" icon="facebook blue" disabled />
            <Dropdown.Item text="Twitter" icon="twitter blue" disabled />
          </Dropdown.Menu>
        ) : (
          <Dropdown.Menu>
            <Dropdown.Item text="Logout" icon="close" onClick={logout} />
          </Dropdown.Menu>
        )}
      </Dropdown>
    </Box>
  );
}
