import Head from "next/head";
import Thread from "../components/Thread";
import fetch from "node-fetch";

export default function Index(props) {
  return (
    <>
      <Head>
        <title>JThreads</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
      </Head>
      <Thread {...props} />
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
