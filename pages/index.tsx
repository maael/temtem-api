import { useEffect, useState } from "react";
import Jumbrotron from "@maael/jumbotron-component";
import ApiBlock from "@maael/api-block-component";
import ApiHeader from "@maael/api-header-component";
import ApiParamBlock from "@maael/api-param-block-component";
import * as examples from "../util/examples";

export default () => (
  <>
    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
      }
    `}</style>
    <Header />
    <KnownTemtemsBlock />
    <TypesBlock />
    <ConditionsBlock />
    <TechniquesBlock />
    <TraitsBlock />
    <GearBlock />
    <WeaknessesBlock />
    <CalculateBlock />
    <BreedingBlock />
  </>
);

function useNum(url: string) {
  const [num, setNum] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        setNum((await res.json()).length);
      } catch (e) {
        console.error(e);
      }
    })().catch(e => console.error(e));
  }, []);
  return num;
}

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

function Header() {
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

function KnownTemtemsBlock() {
  const num = useNum("/api/known-temtems");
  return (
    <ApiBlock example={examples.knownTemtemExample}>
      <>
        <ApiHeader path="/api/known-temtems" style={{ marginBottom: 10 }} />
        <ApiParamBlock
          style={{ margin: 10 }}
          params={[
            {
              name: "names",
              required: false,
              description:
                "A comma separated list of the Temtem names that you want information about."
            },
            {
              name: "fields",
              required: false,
              description: "A comma separated list of fields you want returned."
            },
            {
              name: "expand",
              required: false,
              description: "A comma separated list of fields you want extended."
            }
          ]}
        />
        <p>Currently has information for {num} Temtems.</p>
        <p>
          You can extend the <b>trait</b>, <b>technique</b>, and <b>type</b>{" "}
          fields, which then means they will return an array of data in the
          shape returned by the endpoints below instead of the shape shown here.
        </p>
      </>
    </ApiBlock>
  );
}

function TypesBlock() {
  const num = useNum("/api/types");
  return (
    <ApiBlock example={examples.typeExample}>
      <>
        <ApiHeader path="/api/types" style={{ marginBottom: 10 }} />
        <p>Currently has information for {num} types.</p>
      </>
    </ApiBlock>
  );
}

function ConditionsBlock() {
  const num = useNum("/api/conditions");
  return (
    <ApiBlock example={examples.conditionExample}>
      <>
        <ApiHeader path="/api/conditions" style={{ marginBottom: 10 }} />
        <p>Currently has information for {num} conditions.</p>
      </>
    </ApiBlock>
  );
}

function TechniquesBlock() {
  const num = useNum("/api/techniques");
  return (
    <ApiBlock example={examples.techniqueExample}>
      <>
        <ApiHeader path="/api/techniques" style={{ marginBottom: 10 }} />
        <ApiParamBlock
          style={{ margin: 10 }}
          params={[
            {
              name: "names",
              required: false,
              description:
                "A comma separated list of technique names that you want information about."
            },
            {
              name: "fields",
              required: false,
              description: "A comma separated list of fields you want returned."
            }
          ]}
        />
        <p>Currently has information for {num} techniques.</p>
      </>
    </ApiBlock>
  );
}

function TraitsBlock() {
  const num = useNum("/api/traits");
  return (
    <ApiBlock example={examples.traitExample}>
      <>
        <ApiHeader path="/api/traits" style={{ marginBottom: 10 }} />
        <ApiParamBlock
          style={{ margin: 10 }}
          params={[
            {
              name: "names",
              required: false,
              description:
                "A comma separated list of trait names that you want information about."
            },
            {
              name: "fields",
              required: false,
              description: "A comma separated list of fields you want returned."
            }
          ]}
        />
        <p>Currently has information for {num} traits.</p>
      </>
    </ApiBlock>
  );
}

function GearBlock() {
  const num = useNum("/api/gear");
  return (
    <ApiBlock example={examples.gearExample}>
      <>
        <ApiHeader path="/api/gear" style={{ marginBottom: 10 }} />
        <p>Currently has information for {num} pieces of gear.</p>
      </>
    </ApiBlock>
  );
}

function WeaknessesBlock() {
  return (
    <ApiBlock example={examples.weaknessesExample}>
      <ApiHeader path="/api/weaknesses" style={{ marginBottom: 10 }} />
    </ApiBlock>
  );
}

function CalculateBlock() {
  return (
    <ApiBlock example={examples.weaknessCalculateExample}>
      <>
        <ApiHeader
          path="/api/weaknesses/calculate"
          style={{ marginBottom: 10 }}
        />
        <ApiParamBlock
          style={{ margin: 10 }}
          params={[
            {
              name: "attacking",
              required: false,
              description: "A valid Temtem type to use as the attack value."
            },
            {
              name: "defending",
              required: false,
              description:
                "A comma separated list of valid Temtem types to use as the defending values"
            }
          ]}
        />
      </>
    </ApiBlock>
  );
}

function BreedingBlock() {
  return (
    <ApiBlock example={examples.breedingExample}>
      <ApiHeader path="/api/breeding" style={{ marginBottom: 10 }} />
    </ApiBlock>
  );
}
