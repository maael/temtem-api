import { useEffect, useState } from "react";
import ApiBlock from "@maael/api-block-component";
import ApiHeader from "@maael/api-header-component";
import ApiParamBlock from "@maael/api-param-block-component";
import * as examples from "../util/examples";
import Header from "../components/Header";

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

function IconFieldNote() {
  const url = typeof window !== "undefined" ? window.location.origin : "";
  return (
    <p>
      <b>Note:</b> The icon field is the path to an image under {url}.
    </p>
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
        <IconFieldNote />
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
        <IconFieldNote />
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
        <IconFieldNote />
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
        <IconFieldNote />
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
