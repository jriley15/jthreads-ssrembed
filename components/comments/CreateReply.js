import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { post } from "../../util/fetcher";
import useThread from "../../hooks/useThread";
import useAuth from "../../hooks/useAuth";

export default function CreateReply({ comment, stopReplying }) {
  const [reply, setReply] = useState();
  const { thread } = useThread();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    displayName: reduxDisplayName,
    setDisplayName: setReduxDisplayName,
  } = useAuth();
  const [displayName, setDisplayName] = useState(reduxDisplayName);
  const [errors, setErrors] = useState({});

  const handleSendReply = async () => {
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
      parentCommentId: comment.commentId,
      name: reduxDisplayName || displayName,
      body: reply,
    });
    setLoading(false);
    if (response.success) {
      setReply("");
      stopReplying();
    }
  };

  const hasErrors = () => {
    let errorsCopy = { ...errors };
    if (!comment) {
      errorsCopy = { ...errorsCopy, comment: "Required" };
    } else {
      delete errorsCopy.comment;
    }
    if (!displayName && !isAuthenticated) {
      errorsCopy = { ...errorsCopy, displayName: "Required" };
    } else {
      delete errorsCopy.displayName;
    }
    setErrors(errorsCopy);
    return Object.keys(errorsCopy)?.length > 0;
  };

  return (
    <div>
      <Form style={{ paddingTop: "1rem" }}>
        <Form.Field width={12}>
          <Form.TextArea
            autoFocus
            value={reply}
            placeholder={"Leave a reply"}
            rows={2}
            style={{ height: 60, resize: "none" }}
            disabled={loading}
            error={false}
            onChange={(e) => setReply(e.target.value)}
          />
        </Form.Field>
        <Form.Group>
          <Form.Input
            value={reduxDisplayName || displayName}
            placeholder={"Display Name"}
            disabled={reduxDisplayName || loading}
            error={false}
            onChange={(e) => setDisplayName(e.target.value)}
            width={8}
          />
          <Form.Field width={4}>
            <Button
              size="small"
              disabled={loading}
              onClick={handleSendReply}
              fluid
              loading={loading}
            >
              Send
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>
    </div>
  );
}
