import React, { useState, useEffect, useRef } from "react";
import {
  Divider,
  Comment as SemanticComment,
  List,
  Header,
} from "semantic-ui-react";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/authSlice";
import styles from "../public/styles/Thread.module.scss";
import Box from "./shared/Box";
import Heading from "./Heading";
import Stats from "./Stats";
import Filters from "./Filters";
import CreateComment from "./comments/CreateComment";
import { selectThread } from "../redux/threadSlice";
import Comments from "./comments/Comments";
import useThread from "../hooks/useThread";
import { Container } from "next/app";
import Layout from "./Layout";
import ResizeObserver from "resize-observer-polyfill";
import { useRouter } from "next/router";

function Thread() {
  const { isAuthenticated } = useSelector(selectAuth);
  const { thread } = useThread();
  const containerRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      // Only care about the first element, we expect one element ot be watched
      const { height } = entries[0].contentRect;
      if (window.parent) window.parent.postMessage({ height: height }, "*");
    });

    observer.observe(containerRef.current);

    return () => {
      observer.unobserve(containerRef.current);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <style>
        {`.ui.placeholder,
            .ui.placeholder .image.header:after,
            .ui.placeholder .line,
            .ui.placeholder .line:after,
            .ui.placeholder > :before {
              background-color: #${router?.query?.backgroundColor || `FFFFFF`};
            }`}
      </style>
      <Layout>
        <Container id="jthread-container">
          <SemanticComment.Group
            className={styles.mainCommentGroup}
            size="large"
          >
            <Heading thread={thread} />
            <Divider />
            <Box justify="space-between" alignItems="flex-start">
              <Stats />
              <Filters />
            </Box>
            <Box mt={1}>
              <CreateComment />
            </Box>
            <Comments />
          </SemanticComment.Group>
          <Divider />

          <List horizontal divided>
            <List.Item>
              <Header as="h4">
                Powered by{" "}
                <a href="https://jthreads.jrdn.tech" target="_blank">
                  JThreads
                </a>
              </Header>
            </List.Item>
            <List.Item>
              <Header as="h6">v1.0</Header>
            </List.Item>
          </List>
        </Container>
      </Layout>
    </div>
  );
}

export default Thread;
