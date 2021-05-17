// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.

import { NEST_LAND_BASE_URL } from "../constants.ts";
import { map, N } from "../deps.ts";

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

const query = async (search: string) => {
  try {
    const res = await fetch(NEST_LAND_BASE_URL);
    const { body } = await res.json() as Response;

    const isAvailable = N(map(({ name }) => name, body).includes(search));
    return ["nest.land", isAvailable] as const;
  } catch {
    return ["nest.land", false] as const;
  }
};

export { query };
