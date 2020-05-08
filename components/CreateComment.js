import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/authSlice";
import useSWR from "swr";
import { Comment, Form, Button } from "semantic-ui-react";

export default function CreateComment() {
  const { isAuthenticated } = useSelector(selectAuth);
  const [commentLoading, setCommentLoading] = useState(false);
  const [comment, setComment] = useState("");
  const { data, error } = useSWR(
    "https://jthreadsapi.jrdn.tech/User/Me",
    (url) => fetch(url, { credentials: "include" })
  );
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      setUser((await data.json()).data);
    };
    if (data?.status === 200) getUser();
  }, [data]);

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
      <Form reply style={{ marginLeft: 16, width: "100%" }}>
        <Form.TextArea
          value={comment}
          onChange={handleCommentChange}
          placeholder={"Leave a comment"}
          disabled={!isAuthenticated || commentLoading}
          rows={2}
          style={{ height: 70, width: "100%" }}
        />

        {isAuthenticated && (
          <Button
            content="Add Comment"
            loading={commentLoading}
            labelPosition="left"
            icon="edit"
            primary
            onClick={handleSendComment}
          />
        )}
      </Form>
    </>
  );
}
