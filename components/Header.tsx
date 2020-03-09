import { useEffect, useState } from "react";
import Jumbrotron from "@maael/jumbotron-component";
import { FaReddit, FaDiscord, FaGithub } from "react-icons/fa";

function useInfo() {
  const [info, setInfo] = useState({
    lastUpdated: "🔄",
    lastChecked: "🔄",
    lastBuildStatus: "🔄"
  });
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/info");
        const data = await res.json();
        setInfo({
          lastChecked: data.lastChecked ? formatDate(data.lastChecked) : "❔",
          lastUpdated: data.lastUpdated ? formatDate(data.lastUpdated) : "❔",
          lastBuildStatus: data.lastBuildStatus
            ? formatStatus(data.lastBuildStatus)
            : "❔"
        });
      } catch (e) {
        console.error(e);
      }
    })().catch(e => console.error(e));
  }, []);
  return info;
}

function formatDate(inp: string) {
  const d = new Date(inp);
  return `${d.toDateString()} @ ${d
    .toTimeString()
    .split(" ")[0]
    .split(":")
    .slice(0, 2)
    .join(":")}`;
}

function formatStatus(inp: string) {
  if (inp === "success") {
    return "✅";
  } else if (inp === "completed") {
    return "✅";
  } else if (inp === "running") {
    return "🏃‍♂️";
  } else if (inp === "failed") {
    return "❌";
  } else {
    return "❔";
  }
}

export default function Header() {
  const info = useInfo();
  return (
    <>
      <Jumbrotron>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: "bold", marginBottom: 5 }}>Temtem API</div>
          <div style={{ marginBottom: 5 }}>
            JSON data from the official wiki, updated every 4 hours
          </div>
          <div style={{ fontSize: 12 }}>Checked: {info.lastChecked}</div>
          <div style={{ fontSize: 12 }}>Updated: {info.lastUpdated}</div>
          <div style={{ fontSize: 12 }}>Status: {info.lastBuildStatus}</div>
        </div>
      </Jumbrotron>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 14,
          textAlign: "center",
          backgroundColor: "rebeccapurple",
          color: "#FFFFFF"
        }}
      >
        <a
          style={{ fontSize: 12, color: "#B28CD9", textDecoration: "none" }}
          href="https://github.com/maael/temtem-api"
        >
          <FaGithub
            size={14}
            style={{ position: "relative", top: 3, left: -3 }}
          />
          Feature request or issue? Open a ticket here.
        </a>
      </div>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 12,
          textAlign: "center",
          backgroundColor: "rebeccapurple",
          color: "#FFFFFF",
          paddingTop: 5
        }}
      >
        <p
          style={{
            display: "inline",
            color: "#B28CD9",
            textDecoration: "none",
            margin: "0px 10px"
          }}
        >
          Made by:
        </p>
        <a
          style={{
            color: "#B28CD9",
            textDecoration: "none",
            margin: "0px 10px"
          }}
          href="https://www.reddit.com/user/Maael/"
        >
          <FaReddit
            size={14}
            style={{ position: "relative", top: 3, left: -3 }}
          />
          u/Maael
        </a>
        <a
          style={{
            color: "#B28CD9",
            textDecoration: "none",
            margin: "0px 10px"
          }}
          href="https://discordapp.com"
        >
          <FaDiscord
            size={14}
            style={{ position: "relative", top: 3, left: -3 }}
          />
          maael#2482
        </a>
      </div>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 14,
          textAlign: "center",
          padding: 10,
          backgroundColor: "rebeccapurple",
          color: "#FFFFFF"
        }}
      >
        Typescript types for responses are available from{" "}
        <code>
          <a
            href="https://www.npmjs.com/package/@maael/temtem-types"
            style={{
              textDecoration: "none",
              color: "#B28CD9",
              fontWeight: "bold"
            }}
          >
            @maael/temtem-types
          </a>
        </code>
        .
      </div>
    </>
  );
}
