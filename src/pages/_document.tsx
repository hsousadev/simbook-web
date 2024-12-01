import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />

      <link rel="icon" href="/favicon.svg" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <title>Simbook</title>

      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
