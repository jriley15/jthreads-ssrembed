import React, { useEffect, useState, useMemo } from "react";
import styles from "../../public/styles/Comments.module.scss";
import useComments from "../../hooks/useComments";
import Comment from "./Comment";
import { Pagination } from "semantic-ui-react";
import useThread from "../../hooks/useThread";
import Box from "../shared/Box";
import { fetcher } from "../../util/fetcher";
import useSWR from "swr";
import CommentPlaceholder from "./CommentPlaceholder";

const CommentsPerPage = 10;

export default function Comments() {
  const { comments, setComments, cachedPages } = useComments();
  const { thread, pageIndex, setPageIndex, sortType } = useThread();
  const [loading, setLoading] = useState(false);

  const { data, error } = useSWR(
    `https://jthreadsapi.jrdn.tech/Comment/Search?threadId=${
      thread.threadId
    }&pageIndex=${pageIndex - 1}&sortType=${sortType}`,
    fetcher
  );

  const handlePageChange = (e, { activePage }) => {
    setPageIndex(activePage);
  };

  useEffect(() => {
    if (cachedPages[pageIndex]) {
      setComments(cachedPages[pageIndex]);
    } else {
      setComments([]);
      setLoading(true);
    }
  }, [pageIndex]);

  useEffect(() => {
    if (data) {
      setComments(data, pageIndex);
      setLoading(false);
    }
  }, [data]);

  const remainingComments = useMemo(() => {
    if (thread.totalComments < CommentsPerPage) return thread.totalComments;

    return CommentsPerPage;
  }, [thread]);

  return (
    <div className={styles.commentsContainer}>
      {comments?.map((comment, commentIndex) => (
        <Comment
          key={comment.commentId}
          commentIndex={commentIndex}
          comment={comment}
        />
      ))}
      {loading && (
        <>
          {new Array(remainingComments).fill(0).map((elem, index) => (
            <CommentPlaceholder padding key={"cp-" + index} />
          ))}
        </>
      )}

      {Math.ceil(thread.comments / CommentsPerPage) > 1 && (
        <Box mt={2} mb={2} justify="center">
          <Pagination
            totalPages={Math.ceil(thread.comments / CommentsPerPage)}
            activePage={pageIndex}
            onPageChange={handlePageChange}
          />
        </Box>
      )}
    </div>
  );
}
