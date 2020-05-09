import React, { useEffect, useState } from "react";
import useComments from "../hooks/useComments";
import useThread from "../hooks/useThread";
import { Comment, Form, Button } from "semantic-ui-react";
import useSWR from "swr";
import CommentPlaceholder from "./CommentPlaceholder";
import CommentReply from "./CommentReply";

export default function CommentReplies({ comment, commentIndex }) {
  const { toggleRepliesLoading, comments, setReplies } = useComments();
  const { thread } = useThread();
  const [repliesPageIndex, setRepliesPageIndex] = useState(0);

  const fetcher = (url) => {
    return fetch(url, {
      credentials: "include",
    }).then((r) => r.json());
  };

  const { data, error } = useSWR(
    `https://jthreadsapi.jrdn.tech/Comment/Search?threadId=${
      thread.threadId
    }&pageIndex=${repliesPageIndex || 0}&parentId=${
      comment.commentId
    }&pageSize=5`,
    fetcher
  );

  const handleLoadMoreReplies = () => {
    setRepliesPageIndex(repliesPageIndex + 1);
  };

  useEffect(() => {
    if (comment.replies && repliesPageIndex === 0) return;
    if (data) setReplies(commentIndex, data.data);
  }, [data]);

  useEffect(() => {
    if (!comment.replies) {
      toggleRepliesLoading(commentIndex, true);
    }
  }, []);

  return (
    <Comment.Group size="large">
      {comment.repliesLoading ? (
        <CommentPlaceholder replyCount={comment.replyCount} />
      ) : (
        <>
          {comment.replies?.map((reply, replyIndex) => (
            <CommentReply
              key={reply.commentId}
              index={replyIndex}
              reply={reply}
            />
          ))}
        </>
      )}
      {comment.replies?.length < comment.replyCount && (
        <Form.Field>
          <Button
            size="small"
            loading={comment.repliesLoading}
            onClick={handleLoadMoreReplies}
          >
            Load more
          </Button>
        </Form.Field>
      )}
    </Comment.Group>
  );
}
