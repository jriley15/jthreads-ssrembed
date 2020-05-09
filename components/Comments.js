import React from "react";
import styles from "../public/styles/Comments.module.scss";
import useComments from "../hooks/useComments";
import Comment from "./Comment";
import { Pagination } from "semantic-ui-react";
import useThread from "../hooks/useThread";
import Box from "./shared/Box";

const CommentsPerPage = 10;

export default function Comments() {
  const { comments } = useComments();
  const { thread } = useThread();
  const page = 0;

  const handlePageChange = () => {
    
  };

  return (
    <div className={styles.commentsContainer}>
      {comments?.map((comment, commentIndex) => (
        <Comment
          key={comment.commentId}
          commentIndex={commentIndex}
          comment={comment}
        />
      ))}
      {Math.ceil(thread.comments / CommentsPerPage) > 1 && (
        <Box mt={2} mb={2} justify="center">
          <Pagination
            totalPages={Math.ceil(thread.comments / CommentsPerPage)}
            activePage={page + 1}
            onPageChange={handlePageChange}
          />
        </Box>
      )}
    </div>
  );
}
