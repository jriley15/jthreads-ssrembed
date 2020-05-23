import React, { useEffect } from "react";
import { Comment } from "semantic-ui-react";
import CommentBody from "./CommentBody";

export default function CommentReply({ reply, index }) {
  useEffect(() => {}, [reply]);

  return (
    <Comment
      key={reply.commentId}
      style={{
        paddingTop: "0.75rem",
        paddingBottom: "0.75rem",
        // backgroundColor:
        //   reply.commentId === newComment
        //     ? "rgba( 250, 223, 173, 0.2)"
        //     : "inherit",
      }}
    >
      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />{" "}
      <Comment.Content>
        <Comment.Author as="a">{reply.user?.displayName}</Comment.Author>
        <span style={{ paddingLeft: 8 }}>·</span>
        <Comment.Metadata>
          <div>Just now</div>
        </Comment.Metadata>
        <Comment.Text>
          <CommentBody body={reply.body} />
        </Comment.Text>
      </Comment.Content>
    </Comment>
  );
}
