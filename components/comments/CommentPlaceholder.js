import React from "react";
import { Placeholder, Comment } from "semantic-ui-react";

export default function CommentPlaceholder({ padding }) {
  return (
    <Comment
      style={{
        marginTop: "1rem",
        marginBottom: "1rem",
        paddingTop: padding ? "1rem" : "",
        paddingBottom: padding ? "1rem" : "",
      }}
    >
      <Placeholder>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
      </Placeholder>
    </Comment>
  );
}
