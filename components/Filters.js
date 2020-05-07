import React, { useState } from "react";
import { List, Dropdown, Header, Icon } from "semantic-ui-react";

export default function Filters() {
  const [selectedSort, setSelectedSort] = useState(0);
  const handleSortSelect = () => {};

  return (
    <List divided horizontal>
      <List.Item>
        <Dropdown
          direction="left"
          button
          text={
            <Header as="h4" color="grey">
              Share
            </Header>
          }
          labeled
          icon={<Icon name="share" style={{ marginLeft: 6, marginTop: 2 }} />}
        >
          <Dropdown.Menu>
            <Dropdown.Item text="Facebook" icon="facebook blue" />
            <Dropdown.Item text="Twitter" icon="twitter blue" />
          </Dropdown.Menu>
        </Dropdown>
      </List.Item>
      <List.Item>
        <Dropdown
          direction="left"
          labeled
          button
          header
          text={
            <Header as="h4" color="grey">
              Sort by
            </Header>
          }
        >
          <Dropdown.Menu>
            <Dropdown.Item
              text="Most Recent"
              selected={selectedSort === 0}
              onClick={handleSortSelect(0)}
            />
            <Dropdown.Item
              text="Highest rating"
              onClick={handleSortSelect(1)}
              selected={selectedSort === 1}
            />
            <Dropdown.Item
              onClick={handleSortSelect(2)}
              text="Most Replies"
              selected={selectedSort === 2}
            />
          </Dropdown.Menu>
        </Dropdown>
      </List.Item>
      <List.Item style={{ height: 24.67 }}>
        <Dropdown
          direction="left"
          labeled
          button
          text={
            <Header as="h5" color="grey">
              <Icon name="setting" style={{ marginRight: 0 }} />
            </Header>
          }
        >
          <Dropdown.Menu>
            <Dropdown.Item text="Setting 1" />
            <Dropdown.Item text="Setting 2" />
            <Dropdown.Item text="Setting 3" />
          </Dropdown.Menu>
        </Dropdown>
      </List.Item>
    </List>
  );
}
