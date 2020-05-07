import React from "react";
import { Comment, Icon } from "semantic-ui-react";
import { getDateString } from "../util/dateHelper";
import CommentBody from "./CommentBody";
import styles from "../public/styles/Comments.module.scss";

export default function Comments({ comments }) {
  return (
    <div>
      {comments?.map((comment, commentIndex) => (
        <Comment
          className={styles.comment}
          key={comment.commentId}
          // style={{
          //   backgroundColor:
          //     comment.commentId === newComment
          //       ? "rgba( 250, 223, 173, 0.2)"
          //       : "inherit",
          // }}
        >
          <Comment.Avatar
            src={
              comment.user.avatarUrl ||
              "https://bestnycacupuncturist.com/wp-content/uploads/2016/11/anonymous-avatar-sm.jpg"
            }
          />
          <Comment.Content>
            <Comment.Author as="a">{comment.user?.displayName}</Comment.Author>
            <span className={styles.dotSeperator}>·</span>
            <Comment.Metadata>
              {getDateString(comment.createdOn)}
            </Comment.Metadata>
            <Comment.Text>
              <CommentBody body={comment.body} />
            </Comment.Text>
            <Comment.Actions onClick={() => {}}>
              <Comment.Action onClick={() => {}}>Reply</Comment.Action>
              <Comment.Action>|</Comment.Action>
              <Comment.Action>
                <span className={`${styles.action} ${styles.likes}`}>
                  {comment.likes}
                </span>
                <Icon name="thumbs up" onClick={() => {}} />
              </Comment.Action>
              <Comment.Action>
                <span className={`${styles.action} ${styles.dislikes}`}>
                  {comment.dislikes}
                </span>

                <Icon name="thumbs down" onClick={() => {}} />
              </Comment.Action>
              {comment.replyCount > 0 && (
                <>
                  <Comment.Action>|</Comment.Action>
                  <Comment.Action onClick={() => {}}>
                    <Icon
                      name={comment.showReplies ? "caret up" : "caret down"}
                    />
                    {comment.replyCount +
                      (comment.replyCount > 1 ? " replies" : " reply")}
                  </Comment.Action>
                </>
              )}
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      ))}
    </div>
  );
}
