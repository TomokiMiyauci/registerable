# JavaScript API

The JavaScript API is the best way to call it programmatically.

Type Definition:

```ts
declare const registerable: <T extends 'nest.land' | 'npm' | 'deno.land'>(
  name: string,
  option?: Partial<Option<T>> | undefined
) => Promise<RegisterableResult<T>>
```

## Parameters

registerable(`name`, `option`)

This function accept 2 arguments.

### name [`required`]

| name   | type     | desc       |
| ------ | -------- | ---------- |
| `name` | `string` | Query name |

### option [`optional`]

| name       | type     | desc                                                                           | default                           |
| ---------- | -------- | ------------------------------------------------------------------------------ | --------------------------------- |
| `registry` | `array`  | Pick the package registry to query. choice: `deno.land`, `nest.land` and `npm` | [`deno.land`, `nest.land`, `npm`] |
| `mode`     | `string` | Specifies where this function is called. choice: `server` or `universal`       | `server`                          |

### What is mode?

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

## Return value

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

## Definition of error

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

## Examples

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
