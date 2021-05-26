// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.

import { NEST_LAND_BASE_URL } from "./constants/registry.ts";
import { map, N, tryCatch } from "../../deps.ts";

type Response = {
  body: {
    name: string;
    normalizedName: string;
    owner: string;
    description: string;
    repository: string;
    latestVersion: string;
    latestStableVersion: string;
    packageUploadNames: string[];
    locked: null;
    malicious: null;
    unlisted: boolean;
    updatedAt: string;
    createdAt: string;
  }[];
};

const query = async (name: string): Promise<boolean | Error> =>
  tryCatch<Promise<boolean>, Error>(async () => {
    const res = await fetch(NEST_LAND_BASE_URL);
    const { body } = await res.json() as Response;

    const isAvailable = N(map(({ name }) => name, body).includes(name));
    return isAvailable;
  });

export { query };
