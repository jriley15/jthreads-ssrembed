import React, { useEffect } from "react";
import styles from "../../public/styles/Comment.module.scss";
import {
  Icon,
  Comment as SemanticComment,
  Placeholder,
} from "semantic-ui-react";
import useComments from "../../hooks/useComments";
import { getDateString } from "../../util/dateHelper";
import CommentBody from "./CommentBody";
import { selectThread, setComments } from "../../redux/threadSlice";
import CommentPlaceholder from "./CommentPlaceholder";
import CommentReplies from "./CommentReplies";

export default function Comment({ commentIndex, comment }) {
  const { toggleShowReplies } = useComments();

  return (
    <SemanticComment
      className={styles.comment}
      // style={{
      //   backgroundColor:
      //     SemanticComment.SemanticCommentId === newSemanticComment
      //       ? "rgba( 250, 223, 173, 0.2)"
      //       : "inherit",
      // }}
    >
      <SemanticComment.Avatar
        src={
          comment.user?.avatarUrl ||
          `https://avatars.dicebear.com/v2/jdenticon/${
            comment.user?.userId || comment.guest?.guestId
          }.svg`
        }
      />
      <SemanticComment.Content>
        <SemanticComment.Author as="a">
          {comment.user?.displayName || comment.guest?.name}
        </SemanticComment.Author>
        <span className={styles.dotSeperator}>·</span>
        <SemanticComment.Metadata>
          {getDateString(comment.createdOn)}
        </SemanticComment.Metadata>
        <SemanticComment.Text>
          <CommentBody body={comment.body} />
        </SemanticComment.Text>
        <SemanticComment.Actions onClick={() => {}}>
          <SemanticComment.Action onClick={() => {}}>
            Reply
          </SemanticComment.Action>
          <SemanticComment.Action>|</SemanticComment.Action>
          <SemanticComment.Action>
            <span className={`${styles.action} ${styles.likes}`}>
              {comment.likes}
            </span>
            <Icon name="thumbs up" onClick={() => {}} />
          </SemanticComment.Action>
          <SemanticComment.Action>
            <span className={`${styles.action} ${styles.dislikes}`}>
              {comment.dislikes}
            </span>

            <Icon name="thumbs down" onClick={() => {}} />
          </SemanticComment.Action>
          {comment.replyCount > 0 && (
            <>
              <SemanticComment.Action>|</SemanticComment.Action>
              <SemanticComment.Action
                onClick={() => {
                  toggleShowReplies(commentIndex);
                }}
              >
                <Icon name={comment.showReplies ? "caret up" : "caret down"} />
                {comment.replyCount +
                  (comment.replyCount > 1 ? " replies" : " reply")}
              </SemanticComment.Action>
            </>
          )}
        </SemanticComment.Actions>
      </SemanticComment.Content>
      {comment.showReplies && (
        <CommentReplies comment={comment} commentIndex={commentIndex} />
      )}
    </SemanticComment>
  );
}
