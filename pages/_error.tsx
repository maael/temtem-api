import Link from "next/link";
import Header from "../components/Header";

export default function ErrorPage() {
  return (
    <>
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
        <Link href="/">Back to the docs</Link>
      </div>
    </>
  );
}
