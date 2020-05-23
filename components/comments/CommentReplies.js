import React, { useEffect, useState, useMemo } from "react";
import useThread from "../../hooks/useThread";
import { Comment, Form, Button } from "semantic-ui-react";
import CommentReplyPage from "./CommentReplyPage";

export default function CommentReplies({
  comment,
  showReplies,
  refreshCounter,
}) {
  const [pages, setPages] = useState([0]);

  const handleLoadMoreReplies = () => {
    setPages([...pages, pages.length]);
  };

  return (
    showReplies && (
      <div
        justify="stretch"
        style={{ position: "relative", paddingLeft: "1.5rem" }}
      >
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "45px",
            left: 0,
            display: "inline-block",
          }}
        >
          <i
            style={{
              height: "100%",
              borderRight: "1px solid rgba(34,36,38,.15)",
              display: "block",
              width: "50%",
            }}
          />
        </div>

        <Comment.Group size="large">
          {pages?.map((pageIndex) => (
            <CommentReplyPage
              key={"crp-" + pageIndex}
              pageIndex={pageIndex}
              comment={comment}
              refreshCounter={refreshCounter}
            />
          ))}

          {(pages?.length ?? 0) * 5 < comment.replyCount && (
            <Form.Field>
              <Button
                size="small"
                loading={false}
                onClick={handleLoadMoreReplies}
              >
                Load more
              </Button>
            </Form.Field>
          )}
        </Comment.Group>
      </div>
    )
  );
}
