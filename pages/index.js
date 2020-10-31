import { parse } from "cookie";
import jwtDecode from "jwt-decode";
import Head from "next/head";
import fetch from "node-fetch";
import Thread from "../components/Thread";

export default function Index(props) {
  return (
    <>
      <Head>
        <title>JThreads</title>
      </Head>
      <Thread {...props} />
    </>
  );
}

export async function getServerSideProps(context) {
  // Check if token in cookies
  const tokenCookie = context.req.headers.cookie;

  const token = tokenCookie ? parse(tokenCookie).token : null;

  // Parse out claims
  let claims = token ? jwtDecode(token) : undefined;

  // Don't pass claims if token is expired
  if (claims?.exp * 1000 <= new Date().getTime()) {
    claims = undefined;
  }

  const { namespaceId, threadId } = context.query;

  // Fetch data from external API
  const threadFetch = fetch(`https://jthreadsapi.jrdn.tech/Thread/Init`, {
    headers: {
      "Content-Type": "application/json",
      cookie: token ? `token=${token}` : "",
    },
    body: JSON.stringify({
      identifier: threadId,
      namespaceId: namespaceId,
    }),
    method: "POST",
  });

  const commentsFetch = fetch(
    `https://jthreadsapi.jrdn.tech/Comment/Search?threadIdentifier=${threadId}&namespaceId=${namespaceId}`
  );

  let [threadResponse, commentsResponse] = await Promise.all([
    threadFetch,
    commentsFetch,
  ]).then((responses) => Promise.all(responses.map((r) => r.json())));

  let end = Date.now();

  // Pass data to the page via props
  return {
    props: {
      thread: threadResponse ?? null,
      comments: commentsResponse ?? null,
      claims: claims ?? null,
    },
  };
}
