import { Html, Head, Main, NextScript } from "next/document";

export default function Notal() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/default.min.css"
        />
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js"></script>
      </Head>
      <body>
        <noscript className="p-2 absolute bg-white" style={{ zIndex: 999 }}>
          If you are seeing this message, that means{" "}
          <strong>JavaScript has been disabled on your browser</strong>, please{" "}
          <strong>enable JavaScript</strong> to make this app work.
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
