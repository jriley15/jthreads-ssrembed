import React, { useEffect, useState } from "react";
import styles from "../../public/styles/Comment.module.scss";
import {
  Icon,
  Comment as SemanticComment,
  Placeholder,
  Loader,
  Form,
  Button,
} from "semantic-ui-react";
import useComments from "../../hooks/useComments";
import { getDateString } from "../../util/dateHelper";
import CommentBody from "./CommentBody";
import CommentReplies from "./CommentReplies";
import { post } from "../../util/fetcher";
import CreateReply from "./CreateReply";

export default function Comment({ commentIndex, comment }) {
  const { incrementLikes, incrementDislikes } = useComments();
  const [likedComment, setLikedComment] = useState(false);
  const [dislikedComment, setDislikedComment] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [dislikeLoading, setDislikeLoading] = useState(false);
  const [replying, setReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const handleLikeComment = async () => {
    if (!likedComment) {
      setLikeLoading(true);
      let response = await post("/Comment/Rate", {
        type: 1,
        commentId: comment.commentId,
      });
      if (response.success) {
        incrementLikes(commentIndex);
        setLikedComment(true);
      }
      setLikeLoading(false);
    }
  };

  const handleDislikeComment = async () => {
    if (!dislikedComment) {
      setDislikeLoading(true);
      let response = await post("/Comment/Rate", {
        type: 0,
        commentId: comment.commentId,
      });
      if (response.success) {
        incrementDislikes(commentIndex);
        setDislikedComment(true);
      }
      setDislikeLoading(false);
    }
  };

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
        <SemanticComment.Actions>
          <SemanticComment.Action
            onClick={() => {
              setReplying(!replying);
            }}
          >
            Reply
          </SemanticComment.Action>
          <SemanticComment.Action>|</SemanticComment.Action>
          <SemanticComment.Action onClick={handleLikeComment}>
            <span className={`${styles.action} ${styles.likes}`}>
              {comment.likes}
            </span>
            {likeLoading ? (
              <Loader active inline size="mini" />
            ) : (
              <Icon name="thumbs up" />
            )}
          </SemanticComment.Action>
          <SemanticComment.Action onClick={handleDislikeComment}>
            <span className={`${styles.action} ${styles.dislikes}`}>
              {comment.dislikes}
            </span>
            {dislikeLoading ? (
              <Loader active inline size="mini" />
            ) : (
              <Icon name="thumbs down" />
            )}
          </SemanticComment.Action>
          {comment.replyCount > 0 && (
            <>
              <SemanticComment.Action>|</SemanticComment.Action>
              <SemanticComment.Action
                onClick={() => {
                  setShowReplies(!showReplies);
                }}
              >
                <Icon name={showReplies ? "caret up" : "caret down"} />
                {comment.replyCount +
                  (comment.replyCount > 1 ? " replies" : " reply")}
              </SemanticComment.Action>
            </>
          )}
          {replying && <CreateReply comment={comment} />}
        </SemanticComment.Actions>
      </SemanticComment.Content>
      {showReplies && (
        <CommentReplies comment={comment} commentIndex={commentIndex} />
      )}
    </SemanticComment>
  );
}
