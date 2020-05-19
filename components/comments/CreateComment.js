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

export default function CreateComment() {
  const { isAuthenticated } = useSelector(selectAuth);
  const [commentLoading, setCommentLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState();
  // const fetcher = (url) =>
  //   fetch(url, { credentials: "include" }).then((r) => r.json());
  // const { data, error } = useSWR(
  //   "https://jthreadsapi.jrdn.tech/User/Me",
  //   fetcher
  // );

  // useEffect(() => {
  //   if (data) setUser(data);
  // }, [data]);

  const handleCommentChange = () => {};
  const handleSendComment = () => {};

  return (
    <>
      <Comment>
        <Comment.Avatar
          src={
            user?.avatarUrl ??
            "https://bestnycacupuncturist.com/wp-content/uploads/2016/11/anonymous-avatar-sm.jpg"
          }
        />
      </Comment>
      <Form reply style={{ marginLeft: "1rem", width: "100%" }}>
        <Grid padded>
          <Grid.Row>
            <Grid.Column computer={12} tablet={12} mobile={16} stretched>
              <Form.TextArea
                value={comment}
                onChange={handleCommentChange}
                placeholder={"Leave a comment"}
                rows={2}
                style={{ height: 70, resize: "none" }}
              />
            </Grid.Column>
            <Grid.Column computer={4} tablet={4} mobile={16} stretched>
              <Segment basic textAlign="center">
                <Header as="h5">
                  Sign up <a>here</a>
                </Header>
                <Box justify="center" alignItems="center">
                  <Header
                    as="h5"
                    color="grey"
                    style={{ margin: 0, marginRight: "0.5rem" }}
                  >
                    Or
                  </Header>
                  <Button
                    circular
                    color="twitter"
                    icon="twitter"
                    size="small"
                  />
                  <Button circular icon size="small">
                    <img
                      style={{ width: "1.0em" }}
                      src="https://cdn.aircomechanical.com/wp-content/uploads/2018/12/google-review-button.png"
                    />
                  </Button>
                  <Button
                    circular
                    color="facebook"
                    icon="facebook"
                    size="small"
                  />
                </Box>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={12} tablet={12} mobile={16} stretched>
              <Form.Input placeholder="Display Name" />
            </Grid.Column>
            <Grid.Column computer={4} tablet={4} mobile={16} stretched>
              <Button
                content="Post Comment"
                loading={commentLoading}
                labelPosition="left"
                icon="edit"
                primary
                style={{ margin: 0 }}
                onClick={handleSendComment}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {/* <Segment basic textAlign="center">
          <Header as="h5" className={styles.smallMargin}>
            Sign up <a>here</a>
          </Header>
          <Divider horizontal>Or</Divider>
          <Header color="grey" as="h5" className={styles.smallMargin}>
            Sign in with
          </Header>
          <Box justify="center">
            <Button
              circular
              color="twitter"
              icon="twitter"
              size="small"
              disabled
            />
            <Button
              circular
              color="twitter"
              icon="twitter"
              size="small"
              disabled
            />
            <Button
              circular
              color="twitter"
              icon="twitter"
              size="small"
              disabled
            />
          </Box>
        </Segment> */}
      </Form>
    </>
  );
}
