import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";
import useSWR from "swr";
import {
  Comment,
  Form,
  Button,
  Header,
  Divider,
  Segment,
  Grid,
  Image,
} from "semantic-ui-react";
import Box from "../shared/Box";
import styles from "../../public/styles/Headers.module.scss";
import { post, fetcher } from "../../util/fetcher";
import useThread from "../../hooks/useThread";
import useComments from "../../hooks/useComments";
import { SortType } from "../../redux/threadSlice";
import useAuth from "../../hooks/useAuth";

export default function CreateComment() {
  const { setSortType, setPageIndex } = useThread();
  const { refresh } = useComments();
  const [comment, setComment] = useState("");
  const { thread } = useThread();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const {
    isAuthenticated,
    claims,
    displayName: reduxDisplayName,
    setDisplayName: setReduxDisplayName,
    openGoogleSignin,
    openFacebookSignin,
  } = useAuth();
  const [displayName, setDisplayName] = useState(reduxDisplayName);

  const handleSendComment = async () => {
    if (hasErrors()) {
      return;
    }
    if (!isAuthenticated && displayName && !reduxDisplayName) {
      setReduxDisplayName(displayName);
    }
    setLoading(true);
    let response = await post("/Comment/Create", {
      threadId: thread.threadId,
      namespaceId: thread.namespace.namespaceId,
      body: comment,
      name: reduxDisplayName || displayName,
    });
    setLoading(false);
    if (response.success) {
      setComment("");
      setSortType(SortType.MostRecent);
      setPageIndex(1);
      refresh();
    }
  };

  const hasErrors = () => {
    let errorsCopy = { ...errors };
    if (!comment) {
      errorsCopy = { ...errorsCopy, comment: "Required" };
    } else {
      delete errorsCopy.comment;
    }
    if (!displayName && !isAuthenticated && !reduxDisplayName) {
      errorsCopy = { ...errorsCopy, displayName: "Required" };
    } else {
      delete errorsCopy.displayName;
    }
    setErrors(errorsCopy);
    return Object.keys(errorsCopy)?.length > 0;
  };

  return (
    <>
      <Comment>
        <Comment.Avatar
          src={
            claims?.avatarUrl ??
            "https://bestnycacupuncturist.com/wp-content/uploads/2016/11/anonymous-avatar-sm.jpg"
          }
        />
      </Comment>
      <Form reply style={{ marginLeft: "1rem", width: "100%" }}>
        <Form.TextArea
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder={"Leave a comment"}
          rows={2}
          style={{ height: 70, resize: "none" }}
          disabled={loading}
          error={errors.comment}
        />
        <Grid padded>
          <Grid.Column computer={12} tablet={12} mobile={16} stretched>
            {!isAuthenticated && (
              <Form.Input
                placeholder="Display Name"
                onChange={(e) => {
                  setDisplayName(e.target.value);
                }}
                disabled={!!(loading || reduxDisplayName)}
                error={errors.displayName}
                value={reduxDisplayName || displayName}
              />
            )}
          </Grid.Column>
          <Grid.Column computer={4} tablet={4} mobile={16}>
            <Button
              content={isAuthenticated ? "Post" : "Post As Guest"}
              labelPosition="left"
              icon="edit"
              primary
              style={{ margin: 0 }}
              onClick={handleSendComment}
              disabled={loading}
              loading={loading}
              fluid
            />
          </Grid.Column>
        </Grid>

        {!isAuthenticated && (
          <Segment basic textAlign="center">
            <Header as="h5" className={styles.smallMargin}>
              Sign up{" "}
              <a
                href={`${process.env.NEXT_PUBLIC_LANDING_URL}/register`}
                target="_blank"
              >
                here
              </a>
            </Header>
            <Header as="h5" color="grey" className={styles.smallMargin}>
              Or sign in with
            </Header>
            <Box justify="center" alignItems="center">
              <Button
                circular
                icon
                className={styles.loginButton}
                onClick={() => {
                  openGoogleSignin();
                }}
              >
                <img
                  style={{ width: "1.0em" }}
                  src="https://cdn.aircomechanical.com/wp-content/uploads/2018/12/google-review-button.png"
                />
              </Button>
              <Button
                circular
                color="facebook"
                icon="facebook"
                onClick={() => openFacebookSignin()}
                className={styles.loginButton}
              />
              <Button
                circular
                color="twitter"
                icon="twitter"
                disabled
                className={styles.loginButton}
              />
            </Box>
          </Segment>
        )}
      </Form>
    </>
  );
}
