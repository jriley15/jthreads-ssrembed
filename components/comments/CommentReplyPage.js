import React, { useEffect, useState, useMemo } from "react";
import useThread from "../../hooks/useThread";
import useSWR from "swr";
import CommentPlaceholder from "./CommentPlaceholder";
import { fetcher } from "../../util/fetcher";
import Comment from "./Comment";

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
    const left = comment.directReplyCount - 5 * pageIndex;
    return left > 5 ? 5 : left < 0 ? 0 : left;
  }, [comment]);

  return (
    <>
      {replies?.map((reply, replyIndex) => (
        <Comment
          key={"cr-" + reply.commentId}
          commentIndex={replyIndex}
          comment={reply}
          revalidate={() => {
            revalidate();
          }}
        />
      ))}
      {repliesLoading && (
        <>
          {new Array(remainingReplies).fill(0).map((elem, index) => (
            <CommentPlaceholder key={"crp-" + index} />
          ))}
        </>
      )}
    </>
  );
}
