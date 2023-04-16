import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="max-w-screen-2xl lg:overflow-hidden mx-auto bg-gray-100 dark:bg-gray-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
