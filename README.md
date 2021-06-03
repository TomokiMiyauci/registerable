<p align="center">
  <img alt="logo image" src="https://res.cloudinary.com/dz3vsv9pg/image/upload/v1622682435/projects/registerable/logo.png" />
  <h1 align="center">Registerable</h1>
</p>

<p align="center">
Check if it can be registered as a package name or domain name
</p>

<div align="center">

[![test](https://github.com/TomokiMiyauci/registerable/actions/workflows/test.yml/badge.svg)](https://github.com/TomokiMiyauci/registerable/actions/workflows/test.yml)
[![GitHub release](https://img.shields.io/github/release/TomokiMiyauci/registerable.svg)](https://github.com/TomokiMiyauci/registerable/releases)
[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno&labelColor=black)](https://deno.land/x/registerable)
[![nest badge](https://nest.land/badge.svg)](https://nest.land/package/registerable)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/registerable/mod.ts)
[![deno version](https://img.shields.io/badge/deno-^1.6.0-lightgrey?logo=deno)](https://github.com/denoland/deno)
![node support version](https://img.shields.io/badge/node-%5E14.16.0-yellow)
![bundle size](https://img.shields.io/bundlephobia/min/registerable)
![npm download](https://img.shields.io/npm/dw/registerable?color=blue)

[![dependencies Status](https://status.david-dm.org/gh/TomokiMiyauci/registerable.svg)](https://david-dm.org/TomokiMiyauci/registerable)
[![codecov](https://codecov.io/gh/TomokiMiyauci/registerable/branch/main/graph/badge.svg?token=SPAi5Pv2wd)](https://codecov.io/gh/TomokiMiyauci/registerable)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/f43b1c317e11445399d85ce6efc06504)](https://www.codacy.com/gh/TomokiMiyauci/registerable/dashboard?utm_source=github.com&utm_medium=referral&utm_content=TomokiMiyauci/registerable&utm_campaign=Badge_Grade)
![npm type definitions](https://img.shields.io/npm/types/registerable)
![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)
![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat)
![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

</div>

---

## :bookmark: Table of Contents

- [:bookmark: Table of Contents](#bookmark-table-of-contents)
- [:sparkles: Features](#sparkles-features)
  - [Module registry](#module-registry)
- [:memo: API](#memo-api)
  - [CLI](#cli)
    - [Deno](#deno)
      - [Configuration](#configuration)
      - [Local](#local)
      - [Global](#global)
    - [Node.js](#nodejs)
      - [Local](#local-1)
      - [Global](#global-1)
  - [JavaScript API](#javascript-api)
  - [Parameters](#parameters)
    - [name [`required`]](#name-required)
    - [option [`optional`]](#option-optional)
    - [What is mode?](#what-is-mode)
  - [Return value](#return-value)
  - [Definition of error](#definition-of-error)
  - [Examples](#examples)
- [:green_heart: Supports](#green_heart-supports)
  - [ES modules](#es-modules)
  - [UMD](#umd)
- [:handshake: Contributing](#handshake-contributing)
- [:seedling: Show your support](#seedling-show-your-support)
- [:bulb: License](#bulb-license)

## :sparkles: Features

- :zap: Multi runtime support (`Deno`, `Node.js`)
- :books: Pure TypeScript and provides type definition
- :earth_americas: Universal module, providing `ES modules` and `UMD`
- :package: Optimized, super slim size
- :page_facing_up: TSDoc-style comments

### Module registry

- [deno.land](https://deno.land/x/registerable)
- [nest.land](https://nest.land/package/registerable)
- [npm](https://www.npmjs.com/package/registerable)

## :memo: API

### CLI

The Cli interface is common to `Deno` and `Node.js`.

```bash
@runtime <name> [Options]
```

`@runtime`: How to call it depends on the runtime. See [Deno](#deno) or [Node.js](#nodejs) sections.

`name`: Check module is registerable or not. `required`

`Options`:  
**All options are optional**

| flag               | desc                   | type      | default                           | choice                          |
| ------------------ | ---------------------- | --------- | --------------------------------- | ------------------------------- |
| `-r`, `--registry` | Query to registry      | `array`   | [`deno.land`, `nest.land`, `npm`] | `deno.land`, `nest.land`, `npm` |
| `-j`, `--json`     | Display to JSON format | `boolean` | `false`                           |
| `--verbose`        | Verbose mode           | `boolean` | `true`                            |
| `-h`, `--help`     | Show help              | `boolean` |                                   |                                 |
| `-v`, `--version`  | Show version number    |           |                                   |

#### Deno

`@runtime`: `deno run --allow-net https://deno.land/x/registerable/cli.ts`

##### Configuration

Required permissions:

- --allow-net

##### Local

You can use it directly from the CLI by using `deno run`:

```bash
deno run --allow-net https://deno.land/x/registerable/cli.ts <name> [Options]
```

##### Global

You can also install it globally using the following:

```bash
deno install --allow-net -n registerable https://deno.land/x/registerable/cli.ts
```

Then, the package is available to run:

```bash
registerable <name> [Options]
```

#### Node.js

##### Local

You can install locally.

```bash
yarn add -D registerable
or
npm i -D registerable
```

then,

```bash
yarn registerable <name> [Options]
or
npm run registerable <name> [Options]
```

##### Global

You can also install it globally using the following:

```bash
yarn global add registerable

registerable <name> [Options]
```

### JavaScript API

The JavaScript API is the best way to call it programmatically.

Type Definition:

```ts
declare const registerable: <T extends "nest.land" | "npm" | "deno.land">(
  name: string,
  option?: Partial<Option<T>> | undefined
) => Promise<RegisterableResult<T>>;
```

### Parameters

registerable(`name`, `option`)

This function accept 2 arguments.

#### name [`required`]

| name   | type     | desc       |
| ------ | -------- | ---------- |
| `name` | `string` | Query name |

#### option [`optional`]

| name       | type     | desc                                                                           | default                           |
| ---------- | -------- | ------------------------------------------------------------------------------ | --------------------------------- |
| `registry` | `array`  | Pick the package registry to query. choice: `deno.land`, `nest.land` and `npm` | [`deno.land`, `nest.land`, `npm`] |
| `mode`     | `string` | Specifies where this function is called. choice: `server` or `universal`       | `server`                          |

#### What is mode?

You can avoid CORS errors by specifying the `mode`.
For `server` mode, it queries the public API in the package registry directly.

With the exception of `deno.land`, the public api response headers do not have the `Access-Control-Allow-Origin` property set.
That is, if call this function from browser, you will get a CORS error.

To avoid this, we have prepared a Proxy server.
It returns the result of running the `registerable` function on the server and the response header with `Access-Control-Allow-Origin: *` added.

You can get the result from the following URL:

`https://registerable.vercel.app/check-name`

Mode of `universal` queries this URL and gets the same results as `server` mode without CORS errors.

If there is a possibility of calling the `registerable` function from a Browser such as `SPA` or `SSR`, the mode should be `universal`.

However, if it is clear that it will be called only on the server side, it is recommended to use in `server` mode from the viewpoint of performance.
Therefore, it is set to `server` mode by default.

### Return value

The return value is a JSONObject that indicates whether it can be registered in the package registry, an error message if there is a validation error in query name, and which query caused the error.

```ts
{
  result: {
    "deno.land"?: boolean,
    "nest.land"?: boolean,
    npm?: boolean,
  },
  error: {
     "deno.land"?: string,
     "nest.land"?: string,
      npm?: string,
  },
  hasError: boolean,
  errorRegistry: ("deno.land" | "nest.land" | npm)[],
  name: string,
}
```

| name            | desc                                                                                    |
| --------------- | --------------------------------------------------------------------------------------- |
| `name`          | Same as query name                                                                      |
| `result`        | Map of registry name and result of registerable or not                                  |
| `error`         | Map of registry name and validation error message                                       |
| `hasError`      | Set this flag to `true` if each registry query has more than one name validation error. |
| `errorRegistry` | List the registry names that had validation errors                                      |

### Definition of error

If the package name exists, it will not be treated as an error. Violation of the package name rules in each package registry will report an error.

Click [here](https://github.com/TomokiMiyauci/is-valid-package-name/tree/beta) for package name validation rules.

For example, if there is a validation error as the package name for `deno.land` and `nest.land` :

```ts
const { result, error, errorRegistry } = await registerable('exist-package-name')
// result
{
  result: {
    "deno.land": false,
    "nest.land": false,
    npm: true,
  },
  error: {
     "deno.land": "Name contains only the characters a-z, 0-9 and _",
     "nest.land": "Name contains only the characters a-z, 0-9 and _",
  },
  hasError: true,
  errorRegistry: ["deno.land", "nest.land"],
  name: "exist-package-name",
}

errorRegistry.forEach((registry) => console.warn(registry, error[registry]))
// deno.land "Name contains only the characters a-z, 0-9 and _"
// nest.land "Name contains only the characters a-z, 0-9 and _"
```

### Examples

```ts
await registerable('not_exist_package')
// result
{
  result: {
    "deno.land": true,
    "nest.land": true,
    npm: true,
  },
  error: {},
  hasError: false,
  errorRegistry: [],
  name: "not_exist_package",
}

await registerable('not_exist_package', {
  registry: ['deno.land']
})
// result
{
  result: {
    "deno.land": true
  },
  error: {},
  hasError: false,
  errorRegistry: [],
  name: "not_exist_package",
}
```

## :green_heart: Supports

The TypeScript version must be `4.1.0` or higher.

This project provide `ES modules` and `UMD`. The range supported by both is different.

### ES modules

Limit support to the latest environment to reduce the bundle size.

| <img width="30px" height="30px" alt="Deno" src="https://res.cloudinary.com/dz3vsv9pg/image/upload/v1620998361/logos/deno.svg"></br>Deno | <img width="24px" height="24px" alt="Node.js" src="https://res.cloudinary.com/dz3vsv9pg/image/upload/v1620998361/logos/nodejs.svg"></br>Node.js | <img width="24px" height="24px" alt="IE / Edge" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png"></br>Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /></br>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /></br>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /></br>Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" /></br>iOS Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" /></br>Samsung | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" /></br>Opera |
| --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| ^1.6.0                                                                                                                                  | ^14.16.0                                                                                                                                        | last 2 versions                                                                                                                                      | last 2 versions                                                                                                                                               | last 2 versions                                                                                                                                           | last 2 versions                                                                                                                                           | last 2 versions                                                                                                                                                           | last 2 versions                                                                                                                                                                 | last 2 versions                                                                                                                                       |

### UMD

Browser is supporting since IE11.

| <img width="24px" height="24px" alt="Node.js" src="https://res.cloudinary.com/dz3vsv9pg/image/upload/v1620998361/logos/nodejs.svg"></br>Node.js | <img width="24px" height="24px" alt="IE / Edge" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png"></br>IE / Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /></br>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /></br>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /></br>Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" /></br>iOS Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" /></br>Samsung | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" /></br>Opera |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| ^6.17.0                                                                                                                                         | IE11 / ^16                                                                                                                                                | ^60                                                                                                                                                           | ^61                                                                                                                                                       | ^10.1                                                                                                                                                     | ^10.3                                                                                                                                                                     | ^8.2                                                                                                                                                                            | ^48                                                                                                                                                   |

Compared to `ES modules`, `UMD` has a bundle size increase of about 2.5x. Recommend using `ES modules` as much as possible.

## :handshake: Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues](https://github.com/TomokiMiyauci/equal/issues).

## :seedling: Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.patreon.com/tomoki_miyauci">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## :bulb: License

Copyright © 2021-present [TomokiMiyauci](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license
