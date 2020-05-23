import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { post } from "../../util/fetcher";
import useThread from "../../hooks/useThread";
import useAuth from "../../hooks/useAuth";

export default function CreateReply({ comment }) {
  const [reply, setReply] = useState();
  const { thread } = useThread();
  const [loading, setLoading] = useState(false);
  const {
    displayName: reduxDisplayName,
    setDisplayName: setReduxDisplayName,
  } = useAuth();
  const [displayName, setDisplayName] = useState("");

  const handleSendReply = async () => {
    let response = await post("/Comment/Create", {
      threadId: thread.threadId,
      namespaceId: thread.namespace.namespaceId,
      parentCommentId: comment.commentId,
      body: reply,
    });
    if (response.success) {
    }
  };

  return (
    <div>
      <Form style={{ paddingTop: "1rem" }}>
        <Form.Field width={12}>
          <Form.TextArea
            value={reply}
            placeholder={"Leave a reply"}
            rows={2}
            style={{ height: 60, resize: "none" }}
            disabled={loading}
            error={false}
            onChange={(e) => setReply(e.target.value)}
          />
        </Form.Field>
        <Form.Field width={6}>
          <Form.Input
            value={reduxDisplayName || displayName}
            placeholder={"Display Name"}
            disabled={reduxDisplayName || loading}
            error={false}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </Form.Field>
        <Form.Field onClick={handleSendReply} width={4}>
          <Button size="small" loading={false} disabled={false}>
            Send
          </Button>
        </Form.Field>
      </Form>
    </div>
  );
}
