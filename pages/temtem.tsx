import { useEffect, useState } from "react";
import Head from "next/head";

function Home() {
  const [tems, setTems] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/known-temtems");
        if (res.ok) {
          setTems(await res.json());
        }
      } catch (e) {
        console.error(e);
      }
    })().catch(e => console.error(e));
  }, []);
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Head>
        <title>Temtem API</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <meta name=" theme-color" content="#663399" />
        <meta name="author" content="Matthew Elphick" />
        <meta name="description" content="Temtem API" />
      </Head>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {tems.map(
          ({ name, number: num, wikiUrl, types, evolution, icon }: any) => (
            <div
              key={name}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around"
              }}
            >
              <div>{num}</div>
              <div>
                <a href={wikiUrl}>{name}</a>
              </div>
              <div>
                {types.map(t => (
                  <img
                    key={t}
                    height={50}
                    src={`/images/icons/types/${
                      t === "Unknown" ? "UnknownType" : t
                    }.png`}
                  />
                ))}
              </div>
              <div>
                <img src={icon} />
              </div>
              <div>
                {evolution.evolves
                  ? evolution.evolutionTree
                      .map(({ name: evoName, levels }) =>
                        levels ? `${evoName} after ${levels} levels` : evoName
                      )
                      .join(" -> ")
                  : "X"}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Home;
