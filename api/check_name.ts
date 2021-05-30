// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { ServerRequest } from "https://deno.land/std@0.97.0/http/server.ts";
import { checkName } from "../check_name.ts";
import { N } from "../deps.ts";
import { parse, toURL } from "./parse.ts";
import { validateQueryParameter } from "./validate.ts";

export default async (req: ServerRequest) => {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf8",
    "Access-Control-Allow-Origin": "*",
  });
  const url = toURL(req);
  const parsed = parse(url);

  const [validateResult, error] = validateQueryParameter(parsed);
  if (N(validateResult)) {
    return req.respond({
      headers,
      status: 403,
      body: JSON.stringify({ error }),
    });
  }

  const result = await checkName(parsed.name as string, {
    registry: parsed.registry as undefined,
  });

  req.respond({ headers, body: JSON.stringify(result) });
};
