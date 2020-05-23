import React, { useEffect, useState, useMemo } from "react";
import useComments from "../../hooks/useComments";
import useThread from "../../hooks/useThread";
import { Comment, Form, Button } from "semantic-ui-react";
import useSWR from "swr";
import CommentPlaceholder from "./CommentPlaceholder";
import CommentReply from "./CommentReply";
import { fetcher } from "../../util/fetcher";
import Box from "../shared/Box";

export default function CommentReplies({ comment, commentIndex }) {
  const { setReplies } = useComments();
  const { thread } = useThread();
  const [repliesPageIndex, setRepliesPageIndex] = useState(0);
  const [repliesLoading, setRepliesLoading] = useState(false);

  const { data, error } = useSWR(
    `/Comment/Search?threadId=${thread.threadId}&pageIndex=${
      repliesPageIndex || 0
    }&parentId=${comment.commentId}&pageSize=5`,
    fetcher
  );

  const handleLoadMoreReplies = () => {
    setRepliesPageIndex(repliesPageIndex + 1);
  };

  useEffect(() => {
    if (comment.replies && repliesPageIndex === 0) return;
    if (!data) {
      setRepliesLoading(true);
    } else {
      setReplies(commentIndex, data);
      setRepliesLoading(false);
    }
  }, [data]);

  const remainingReplies = useMemo(() => {
    return comment.replyCount - (comment.replies?.length ?? 0);
  }, [comment]);

  return (
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
        {comment.replies?.map((reply, replyIndex) => (
          <CommentReply
            key={reply.commentId}
            index={replyIndex}
            reply={reply}
          />
        ))}
        {repliesLoading && (
          <>
            {new Array(remainingReplies < 5 ? remainingReplies : 5)
              .fill(0)
              .map((elem, index) => (
                <CommentPlaceholder key={"cr-" + index} />
              ))}
          </>
        )}

        {comment.replies?.length < comment.replyCount && (
          <Form.Field>
            <Button
              size="small"
              loading={repliesLoading}
              onClick={handleLoadMoreReplies}
            >
              Load more
            </Button>
          </Form.Field>
        )}
      </Comment.Group>
    </div>
  );
}
