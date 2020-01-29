import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";

export default function ErrorPage() {
  return (
    <>
      <Head>
        <title>Temtem API</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <meta name="theme-color" content="#663399" />
        <meta name="author" content="Matthew Elphick" />
        <meta name="description" content="Temtem API" />
      </Head>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
        }
      `}</style>
      <Header />
      <div
        style={{
          textAlign: "center",
          width: "100%",
          marginTop: 20,
          fontSize: 32,
          fontFamily: "Arial, sans-serif"
        }}
      >
        <Link href="/">
          <a>Back to the docs</a>
        </Link>
      </div>
    </>
  );
}
