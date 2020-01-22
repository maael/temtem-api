import {useEffect, useState} from 'react';
import Head from "next/head";

function Home() {
  const [tems, setTems] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/known-tem-tems');
      if (res.ok) {
        setTems(await res.json());
      }
    })();
  }, [])
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
        <title>TemTem API</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="author" content="Matthew Elphick" />
        <meta name="description" content="TemTem API" />
      </Head>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
      <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
      {tems.map(({name, number, portraitWikiUrl, wikiUrl}) => (
        <div key={name} style={{flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <div>{number}</div>
          <div><a href={wikiUrl}>{name}</a></div>
          <div><img src={portraitWikiUrl} /></div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Home;
