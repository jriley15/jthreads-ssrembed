import React from "react";
import { List, Button, Icon, Label, Header } from "semantic-ui-react";

export default function Stats({ thread }) {
  const handleThreadLike = () => {};

  return (
    <List divided horizontal>
      <List.Item>
        <Button
          as="div"
          labelPosition="right"
          size="tiny"
          onClick={handleThreadLike}
        >
          <Button color="red" size="tiny" loading={thread?.likeLoading}>
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
