import React, { useEffect, useState } from "react";
import useComments from "../hooks/useComments";
import useThread from "../hooks/useThread";
import { Comment, Form, Button } from "semantic-ui-react";
import useSWR from "swr";
import CommentPlaceholder from "./CommentPlaceholder";
import CommentReply from "./CommentReply";
import { fetcher } from "../util/fetcher";

export default function CommentReplies({ comment, commentIndex }) {
  const { toggleRepliesLoading, setReplies } = useComments();
  const { thread } = useThread();
  const [repliesPageIndex, setRepliesPageIndex] = useState(0);

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
    if (!data) {
      toggleRepliesLoading(commentIndex, true);
    } else {
      setReplies(commentIndex, data);
    }
  }, [data]);

  const getRemainingReplies = () => {
    return comment.replyCount - (comment.replies?.length ?? 0);
  };

  return (
    <Comment.Group size="large">
      {comment.replies?.map((reply, replyIndex) => (
        <CommentReply key={reply.commentId} index={replyIndex} reply={reply} />
      ))}
      {comment.repliesLoading && (
        <CommentPlaceholder replyCount={getRemainingReplies()} />
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
