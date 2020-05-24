import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Loader } from "semantic-ui-react";

export default function Receive({ query }) {
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      console.log(router.query);
      const success = router.query.success === "true";
      const errors = !success ? JSON.parse(router.query.errors) : [];

      window.opener.postMessage(
        { oauth: true, success: success, errors: errors },
        window.location.origin
      );
      window.close();
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>JThreads</title>
      </Head>
      <Loader active size="massive">
        Authenticating...
      </Loader>
    </>
  );
}

// import Head from "next/head";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { Loader } from "semantic-ui-react";

// export default function Receive() {
//   const router = useRouter();

//   useEffect(() => {
//     console.log(router.query);
//     const success = router.query.success === "true";
//     const errors = JSON.parse(router.query.errors);

//     window.parent.postMessage(
//       { google: true, success: success, errors: errors },
//       window.location.origin
//     );
//   }, []);

//   return (
//     <>
//       <Head>
//         <title>JThreads</title>
//       </Head>
//       <Loader active inline size="large" />
//     </>
//   );
// }
