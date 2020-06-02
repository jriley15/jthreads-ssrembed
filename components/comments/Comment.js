import React, { useEffect, useState } from "react";
import styles from "../../public/styles/Comment.module.scss";
import {
  Icon,
  Comment as SemanticComment,
  Placeholder,
  Loader,
  Form,
  Button,
  Popup,
} from "semantic-ui-react";
import useComments from "../../hooks/useComments";
import { getDateString } from "../../util/dateHelper";
import CommentBody from "./CommentBody";
import CommentReplies from "./CommentReplies";
import { post, remove } from "../../util/fetcher";
import CreateReply from "./CreateReply";
import useThread from "../../hooks/useThread";

export default function Comment({ commentIndex, comment }) {
  const { incrementLikes, incrementDislikes, refresh } = useComments();
  const { thread } = useThread();
  const [likedComment, setLikedComment] = useState(false);
  const [dislikedComment, setDislikedComment] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [dislikeLoading, setDislikeLoading] = useState(false);
  const [replying, setReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState([0]);
  const [deleteLoading, setDeletingLoading] = useState(false);

  const refreshReplies = () => {
    setRefreshCounter(refreshCounter + 1);
  };

  const stopReplying = () => {
    setReplying(false);
  };

  const handleLikeComment = async () => {
    if (!likedComment && !likeLoading) {
      setLikeLoading(true);
      let response = await post("/Comment/Rate", {
        type: 1,
        commentId: comment.commentId,
      });
      if (response.success) {
        //incrementLikes(commentIndex);
        setLikedComment(true);
      }
      setLikeLoading(false);
    }
  };

  const handleDislikeComment = async () => {
    if (!dislikedComment && !dislikeLoading) {
      setDislikeLoading(true);
      let response = await post("/Comment/Rate", {
        type: 0,
        commentId: comment.commentId,
      });
      if (response.success) {
        //incrementDislikes(commentIndex);
        setDislikedComment(true);
      }
      setDislikeLoading(false);
    }
  };

  const handleDeleteComment = async () => {
    if (!deleteLoading) {
      setDeletingLoading(true);
      let response = await remove(
        `/Comment/Delete?commentId=${comment.commentId}`
      );
      if (response.success) {
        refresh();
      }
      setDeletingLoading(false);
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
        <SemanticComment.Text className={styles.commentBody}>
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
              {comment.likes + (likedComment ? 1 : 0)}
            </span>
            {likeLoading ? (
              <Loader active inline size="mini" />
            ) : (
              <Icon name="thumbs up" />
            )}
          </SemanticComment.Action>
          <SemanticComment.Action onClick={handleDislikeComment}>
            <span className={`${styles.action} ${styles.dislikes}`}>
              {comment.dislikes + (dislikedComment ? 1 : 0)}
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
          {thread.isAdmin && (
            <>
              <SemanticComment.Action>|</SemanticComment.Action>

              <Popup
                on="click"
                trigger={
                  <SemanticComment.Action>
                    {deleteLoading ? (
                      <Loader
                        active
                        inline
                        size="mini"
                        className={`${styles.icon}`}
                      />
                    ) : (
                      <Icon name="trash" />
                    )}
                    <span>Delete</span>
                  </SemanticComment.Action>
                }
              >
                <Popup.Header>Are you sure?</Popup.Header>
                <Popup.Content>
                  <Button
                    color="red"
                    onClick={handleDeleteComment}
                    loading={deleteLoading}
                  >
                    Yes, Delete
                  </Button>
                </Popup.Content>
              </Popup>
            </>
          )}
          {replying && (
            <CreateReply
              comment={comment}
              stopReplying={stopReplying}
              setShowReplies={setShowReplies}
              refreshReplies={refreshReplies}
            />
          )}
        </SemanticComment.Actions>
      </SemanticComment.Content>
      <CommentReplies
        comment={comment}
        showReplies={showReplies}
        refreshCounter={refreshCounter}
      />
    </SemanticComment>
  );
}
