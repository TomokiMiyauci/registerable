import { ServerRequest } from "https://deno.land/std@0.97.0/http/server.ts";
import { ifElse, isLength0 } from "../deps.ts";
const toURL = (req: ServerRequest) => {
  const base = `${req.headers.get("x-forwarded-proto")}://${
    req.headers.get("x-forwarded-host")
  }`;
  return new URL(req.url, base);
};

type ParsedParameters = {
  name?: string | undefined;
  registry?: string[] | undefined;
  [k: string]: unknown;
};
const parse = ({ searchParams }: URL): ParsedParameters => {
  const name = searchParams.get("name");
  const registry = searchParams.getAll("registry");
  const allEntries = [...searchParams].reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {},
  );

  return {
    ...allEntries,
    name: name ?? undefined,
    registry: ifElse(isLength0(registry), undefined, registry),
  };
};

export { parse, toURL };
export type { ParsedParameters };
