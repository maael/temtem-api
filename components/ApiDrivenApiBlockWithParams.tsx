import { useEffect, useState } from "react";
import ApiBlock from "@maael/api-block-component";
import ApiHeader from "@maael/api-header-component";
import ApiParamBlock, {
  Props as ParamBlockProps,
} from "@maael/api-param-block-component";

export interface Props {
  url: string;
  params: ParamBlockProps["params"];
  children: JSX.Element;
}

export default function ApiDrivenApiBlockWithParams({
  url,
  params,
  children,
}: Props) {
  const [paramState] = useState(
    params.reduce((acc, cur) => ({ ...acc, [cur.name]: "" }), {})
  );
  const [res, setRes] = useState({});
  const [err, setErr] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const searchParams = new URLSearchParams(paramState);
      try {
        setLoading(true);
        setErr(undefined);
        const fetchRes = await fetch(`${url}?${searchParams.toString()}`);
        if (fetchRes.ok) {
          setRes(await fetchRes.json());
        }
      } catch {
        setErr("An error occurred");
      } finally {
        setLoading(false);
      }
    })().catch((e) => console.error(e));
  }, [paramState]);
  return (
    <ApiBlock example={res}>
      <>
        <ApiHeader path={url} style={{ marginBottom: 10 }} />
        <ApiParamBlock style={{ margin: 10 }} params={params} />
        {children}
      </>
    </ApiBlock>
  );
}
