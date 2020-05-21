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
import { post } from "../../util/fetcher";
import useThread from "../../hooks/useThread";

export default function CreateComment() {
  const { isAuthenticated, claims } = useSelector(selectAuth);
  const [commentLoading, setCommentLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { thread } = useThread();
  const [loading, setLoading] = useState(false);

  // const fetcher = (url) =>
  //   fetch(url, { credentials: "include" }).then((r) => r.json());
  // const { data, error } = useSWR(
  //   "https://jthreadsapi.jrdn.tech/User/Me",
  //   fetcher
  // );

  // useEffect(() => {
  //   if (data) setUser(data);
  // }, [data]);

  const handleSendComment = async () => {
    setLoading(true);
    let response = await post("https://jthreadsapi.jrdn.tech/Comment/Create", {
      threadId: thread.threadId,
      namespaceId: thread.namespace.namespaceId,
      body: comment,
      name: isAuthenticated ? undefined : displayName,
    });
    setLoading(false);
    if (response.success) {
      setComment("");
    }
  };

  return (
    <>
      <Comment>
        <Comment.Avatar
          src={
            claims?.AvatarUrl ??
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
        />
        <Grid padded>
          <Grid.Column computer={12} tablet={12} mobile={16} stretched>
            <Form.Input
              placeholder="Display Name"
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
              disabled={loading}
            />
          </Grid.Column>
          <Grid.Column computer={4} tablet={4} mobile={16} stretched>
            <Button
              content="Post As Guest"
              loading={commentLoading}
              labelPosition="left"
              icon="edit"
              primary
              style={{ margin: 0 }}
              onClick={handleSendComment}
              disabled={loading}
              loading={loading}
            />
          </Grid.Column>
        </Grid>

        <Segment basic textAlign="center">
          <Header as="h5" className={styles.smallMargin}>
            Sign up <a>here</a>
          </Header>
          <Header as="h5" color="grey" className={styles.smallMargin}>
            Or sign in with
          </Header>
          <Box justify="center" alignItems="center">
            <Button circular color="twitter" icon="twitter" />
            <Button circular icon>
              <img
                style={{ width: "1.0em" }}
                src="https://cdn.aircomechanical.com/wp-content/uploads/2018/12/google-review-button.png"
              />
            </Button>
            <Button circular color="facebook" icon="facebook" />
          </Box>
        </Segment>
      </Form>
    </>
  );
}
