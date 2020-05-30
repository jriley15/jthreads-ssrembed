import React, { useState } from "react";
import { List, Dropdown, Header, Icon } from "semantic-ui-react";
import useThread from "../hooks/useThread";
import { SortType } from "../redux/threadSlice";
import useComments from "../hooks/useComments";
import { openWindowCentered } from "../util/window";

export default function Filters() {
  const {
    sortType,
    setSortType,
    setPageIndex,
    pageIndex,
    parentHref,
  } = useThread();
  const { clearCache } = useComments();

  const handleSortSelect = (type) => {
    if (type !== sortType || pageIndex > 1) {
      clearCache();
      setSortType(type);
      setPageIndex(1);
    }
  };

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
            <Dropdown.Item
              text="Facebook"
              icon="facebook blue"
              onClick={() => {
                openWindowCentered(
                  `https://www.facebook.com/sharer/sharer.php?u=${parentHref}`,
                  600,
                  400
                );
              }}
            ></Dropdown.Item>
            <Dropdown.Item text="Twitter" icon="twitter blue" disabled />
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
              selected={sortType === SortType.MostRecent}
              onClick={() => handleSortSelect(SortType.MostRecent)}
            />
            <Dropdown.Item
              text="Highest rating"
              onClick={() => handleSortSelect(SortType.HighestRating)}
              selected={sortType === SortType.HighestRating}
            />
            <Dropdown.Item
              text="Most Replies"
              onClick={() => handleSortSelect(SortType.MostReplies)}
              selected={sortType === SortType.MostReplies}
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
