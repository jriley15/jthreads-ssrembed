import React, { useEffect, useState, useMemo } from "react";
import useThread from "../../hooks/useThread";
import { Comment, Form, Button } from "semantic-ui-react";
import useSWR from "swr";
import CommentPlaceholder from "./CommentPlaceholder";
import CommentReply from "./CommentReply";
import { fetcher } from "../../util/fetcher";

export default function CommentReplyPage({
  comment,
  pageIndex,
  refreshCounter,
}) {
  const { thread } = useThread();
  const [repliesLoading, setRepliesLoading] = useState(false);

  const { data, error, revalidate } = useSWR(
    `/Comment/Search?threadId=${thread.threadId}&pageIndex=${pageIndex}&parentId=${comment.commentId}&pageSize=5`,
    fetcher
  );
  const [replies, setReplies] = useState(data);

  useEffect(() => {
    if (!replies) {
      setRepliesLoading(true);
    } else {
      setRepliesLoading(false);
    }
  }, [replies]);

  useEffect(() => {
    if (data) {
      setReplies(data);
    }
  }, [data]);

  useEffect(() => {
    revalidate();
  }, [refreshCounter]);

  const remainingReplies = useMemo(() => {
    const left = comment.replyCount - (replies?.length ?? 0);
    return left > 5 ? 5 : left < 0 ? 0 : left;
  }, [replies, comment]);

  return (
    <>
      {replies?.map((reply, replyIndex) => (
        <CommentReply
          key={"cr-" + reply.commentId}
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
    </>
  );
}
