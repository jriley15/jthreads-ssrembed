import React, { useState } from "react";
import { List, Button, Icon, Label, Header } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { post } from "../util/fetcher";
import useThread from "../hooks/useThread";

export default function Stats() {
  const { thread, incrementLikes } = useThread();
  const [disableLikes, setDisableLikes] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  const handleThreadLike = async () => {
    if (disableLikes) return;
    // post and increment likes
    setLikeLoading(true);
    setDisableLikes(true);
    let response = await post("/Thread/Rate", {
      type: 1,
      threadId: thread.threadId,
    });

    if (response?.success) {
      incrementLikes();
    }
    setLikeLoading(false);
  };

  return (
    <List divided horizontal>
      <List.Item>
        <Button
          as="div"
          labelPosition="right"
          size="tiny"
          onClick={handleThreadLike}
        >
          <Button color="red" size="tiny" loading={likeLoading}>
            <Icon name="heart" />
            Like
          </Button>
          <Label as="a" basic color="red" pointing="left" size="tiny">
            {thread?.likes || 0}
          </Label>
        </Button>
      </List.Item>
      <List.Item>
        <Header as="h4">Views: {thread?.views || 0}</Header>
      </List.Item>
    </List>
  );
}
