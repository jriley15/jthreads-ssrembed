import React from "react";
import { Button } from "semantic-ui-react";

function Thread({ comments, thread }) {
  return (
    <div>
      {thread?.data?.identifier}
      {comments?.success &&
        comments.data.map((comment) => (
          <div key={comment.commentId}>{comment.body}</div>
        ))}
    </div>
  );
}

export default Thread;
