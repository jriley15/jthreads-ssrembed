import React from "react";
import { Button } from "semantic-ui-react";

function Thread({ comments, thread }) {
  return (
    <div>
      Hello world ________________________________
      {thread?.data?.identifier}
      ________________________________
      {comments?.success &&
        comments.data.map((comment) => (
          <div key={comment.commentId}>{comment.body}</div>
        ))}
    </div>
  );
}

export default Thread;
