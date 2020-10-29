import React, { useState } from "react";
import { Button, Header, Icon, Label, List } from "semantic-ui-react";
import useThread from "../hooks/useThread";
import { post } from "../util/fetcher";

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
