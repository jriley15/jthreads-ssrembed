import React from "react";
import { Placeholder, Comment } from "semantic-ui-react";

export default function CommentPlaceholder({ replyCount }) {
  return (
    <Comment
      style={{
        marginTop: "1rem",
        marginBottom: "1rem",
      }}
    >
      <Placeholder>
        {new Array(replyCount < 5 ? replyCount : 5)
          .fill(0)
          .map((elem, index) => (
            <Placeholder.Header image key={"cr-" + index}>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
          ))}
      </Placeholder>
    </Comment>
  );
}
