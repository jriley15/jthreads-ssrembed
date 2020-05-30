import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
          <meta property="og:url"           content="https://www.your-domain.com/your-page.html" />
          <meta property="og:type"          content="website" />
          <meta property="og:title"         content="Your Website Title" />
          <meta property="og:description"   content="Your description" />
          <meta property="og:image"         content="https://www.your-domain.com/path/image.jpg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
