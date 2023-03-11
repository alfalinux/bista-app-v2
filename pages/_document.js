import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="max-w-screen-2xl lg:overflow-hidden mx-auto bg-zinc-100 border shadow-sm">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
