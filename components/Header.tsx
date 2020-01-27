import { useEffect, useState } from "react";
import Jumbrotron from "@maael/jumbotron-component";

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
    <Jumbrotron>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: "bold", marginBottom: 5 }}>Temtem API</div>
        <div style={{ marginBottom: 5 }}>
          JSON data from the official wiki, updated every hour
        </div>
        <div style={{ fontSize: 12 }}>Last check: {info.lastChecked}</div>
        <div style={{ fontSize: 12 }}>Last updated: {info.lastUpdated}</div>
        <div style={{ fontSize: 12 }}>Last build: {info.lastBuildStatus}</div>
      </div>
    </Jumbrotron>
  );
}