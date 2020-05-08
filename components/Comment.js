import React, { useEffect } from "react";
import styles from "../public/styles/Comment.module.scss";
import { Icon, Comment as SComment } from "semantic-ui-react";
import useComments from "../hooks/useComments";
import { getDateString } from "../util/dateHelper";
import CommentBody from "./CommentBody";
import { selectThread, setComments } from "../redux/threadSlice";


export default function Comment({ commentIndex, comment }) {
  const { toggleShowReplies } = useComments();

  useEffect(() => {
    if (comment.showReplies) {
      if (!comment.replies) {
        // get replies from api and cache in context
      }
    }
  }, [comment.showReplies]);

  return (
    <SComment
      className={styles.comment}
      // style={{
      //   backgroundColor:
      //     SemanticComment.SemanticCommentId === newSemanticComment
      //       ? "rgba( 250, 223, 173, 0.2)"
      //       : "inherit",
      // }}
    >
      <SComment.Avatar
        src={
          comment.user.avatarUrl ||
          "https://bestnycacupuncturist.com/wp-content/uploads/2016/11/anonymous-avatar-sm.jpg"
        }
      />
      <SComment.Content>
        <SComment.Author as="a">{comment.user?.displayName}</SComment.Author>
        <span className={styles.dotSeperator}>·</span>
        <SComment.Metadata>
          {getDateString(comment.createdOn)}
        </SComment.Metadata>
        <SComment.Text>
          <CommentBody body={comment.body} />
        </SComment.Text>
        <SComment.Actions onClick={() => {}}>
          <SComment.Action onClick={() => {}}>Reply</SComment.Action>
          <SComment.Action>|</SComment.Action>
          <SComment.Action>
            <span className={`${styles.action} ${styles.likes}`}>
              {comment.likes}
            </span>
            <Icon name="thumbs up" onClick={() => {}} />
          </SComment.Action>
          <SComment.Action>
            <span className={`${styles.action} ${styles.dislikes}`}>
              {comment.dislikes}
            </span>

            <Icon name="thumbs down" onClick={() => {}} />
          </SComment.Action>
          {comment.replyCount > 0 && (
            <>
              <SComment.Action>|</SComment.Action>
              <SComment.Action
                onClick={() => {
                  toggleShowReplies(commentIndex);
                }}
              >
                <Icon name={comment.showReplies ? "caret up" : "caret down"} />
                {comment.replyCount +
                  (comment.replyCount > 1 ? " replies" : " reply")}
              </SComment.Action>
            </>
          )}
        </SComment.Actions>
      </SComment.Content>
      {comment.showReplies && (
        <SComment.Group size="large">
          {comment.replies?.map((reply, replyIndex) => (
            <SComment key={reply.SemanticCommentId} index={replyIndex} />
          ))}
        </SComment.Group>
      )}
    </SComment>
  );
}
