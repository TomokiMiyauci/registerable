import { ServerRequest } from "https://deno.land/std@0.97.0/http/server.ts";
const toURL = (req: ServerRequest) => {
  const base = `${req.headers.get("x-forwarded-proto")}://${
    req.headers.get("x-forwarded-host")
  }`;
  return new URL(req.url, base);
};
const parse = ({ searchParams }: URL) => {
  const name = searchParams.get("name");

  return {
    name: name ?? "",
  };
};

export { parse, toURL };
