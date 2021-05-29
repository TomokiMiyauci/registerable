// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { ServerRequest } from "https://deno.land/std@0.97.0/http/server.ts";
import { checkName } from "../check_name.ts";
import { isString } from "https://deno.land/x/fonction@v1.8.0-beta.3/mod.ts";
import { parse, toURL } from "./parse.ts";
import { validateQueryParameter } from "./validate.ts";

export default async (req: ServerRequest) => {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf8",
    "Access-Control-Allow-Origin": "*",
  });
  const url = toURL(req);
  const validateResult = validateQueryParameter(url.searchParams);
  if (isString(validateResult)) {
    return req.respond({
      headers,
      status: 403,
      body: JSON.stringify({ error: validateResult }),
    });
  }
  const { name } = parse(url);

  const result = await checkName(name as string);

  console.log(result, req, headers);

  req.respond({ headers, body: JSON.stringify(result) });
};
