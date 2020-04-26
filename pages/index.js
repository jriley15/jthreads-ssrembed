import Link from "next/link";
import Thread from "../components/Thread";
import fetch from "node-fetch";
import { Button } from "semantic-ui-react";

export default function Index(props) {
  return (
    <>
      <Thread {...props} />

      <Link href="/test">
        <Button>Go to test</Button>
      </Link>
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const threadFetch = fetch(`https://jthreadsapi.jrdn.tech/Thread/Init`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier: "post-1",
      namespaceId: 2,
    }),
    method: "POST",
  });

  const commentsFetch = fetch(
    `https://jthreadsapi.jrdn.tech/Comment/Search?threadIdentifier=post-1&namespaceId=2`
  );

  let [threadResponse, commentsResponse] = await Promise.all([
    threadFetch,
    commentsFetch,
  ]).then(
    async (responses) => await Promise.all([...responses.map((r) => r.json())])
  );

  // Pass data to the page via props
  return {
    props: {
      thread: threadResponse ?? undefined,
      comments: commentsResponse ?? undefined,
    },
  };
}
