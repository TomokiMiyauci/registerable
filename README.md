<p align="center">
  <img alt="logo image" src="img/logo.png" />
  <h1 align="center">Namable</h1>
</p>

<p align="center">
Cross-check whether it can be used as a package name or domain name
</p>

<div align="center">

[![test](https://github.com/TomokiMiyauci/nameable/actions/workflows/test.yml/badge.svg)](https://github.com/TomokiMiyauci/nameable/actions/workflows/test.yml)
[![GitHub release](https://img.shields.io/github/release/TomokiMiyauci/nameable.svg)](https://github.com/TomokiMiyauci/nameable/releases)
[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno&labelColor=black)](https://deno.land/x/nameable)
[![nest badge](https://nest.land/badge.svg)](https://nest.land/package/nameable)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/nameable/mod.ts)
[![deno version](https://img.shields.io/badge/deno-^1.6.0-lightgrey?logo=deno)](https://github.com/denoland/deno)
![node support version](https://img.shields.io/badge/node-%5E14.16.0-yellow)
![bundle size](https://img.shields.io/bundlephobia/min/@miyauci/nameable)
![npm download](https://img.shields.io/npm/dw/@miyauci/nameable?color=blue)

[![dependencies Status](https://status.david-dm.org/gh/TomokiMiyauci/nameable.svg)](https://david-dm.org/TomokiMiyauci/nameable)
[![codecov](https://codecov.io/gh/TomokiMiyauci/nameable/branch/main/graph/badge.svg?token=SPAi5Pv2wd)](https://codecov.io/gh/TomokiMiyauci/nameable)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/f43b1c317e11445399d85ce6efc06504)](https://www.codacy.com/gh/TomokiMiyauci/nameable/dashboard?utm_source=github.com&utm_medium=referral&utm_content=TomokiMiyauci/nameable&utm_campaign=Badge_Grade)
![npm type definitions](https://img.shields.io/npm/types/arithmetic4)
![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)
![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat)
![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

</div>

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [:sparkles: Features](#sparkles-features)
  - [Package name](#package-name)
- [:green_heart: Supports](#green_heart-supports)
  - [ES modules](#es-modules)
  - [UMD](#umd)
- [:handshake: Contributing](#handshake-contributing)
- [:seedling: Show your support](#seedling-show-your-support)
- [:bulb: License](#bulb-license)

## :sparkles: Features

- :zap: Multi runtime support (`Deno`, `Node.js` and Browsers)
- :books: Pure TypeScript and provides type definition
- :earth_americas: Universal module, providing `ES modules` and `UMD`
- :package: Optimized, super slim size
- :page_facing_up: TSDoc-style comments

### Package name

Deno: `nameable` ([deno.land](https://deno.land/x/nameable), [nest.land]())

Node.js: `@miyauci/nameable` ([npm](https://www.npmjs.com/package/@miyauci/nameable))

## :green_heart: Supports

The TypeScript version must be `4.1.0` or higher.

This project provide `ES modules` and `UMD`. The range supported by both is different.

### ES modules

Limit support to the latest environment to reduce the bundle size.

| <img width="30px" height="30px" alt="Deno" src="https://res.cloudinary.com/dz3vsv9pg/image/upload/v1620998361/logos/deno.svg"></br>Deno | <img width="24px" height="24px" alt="Node.js" src="https://res.cloudinary.com/dz3vsv9pg/image/upload/v1620998361/logos/nodejs.svg"></br>Node.js | <img width="24px" height="24px" alt="IE / Edge" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png"></br>Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /></br>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /></br>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /></br>Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" /></br>iOS Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" /></br>Samsung | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" /></br>Opera |
| - | -- | - | -- | - | - | - | -- | -- |
| ^1.6.0 | ^14.16.0 | last 2 versions | last 2 versions | last 2 versions | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

### UMD

Browser is supporting since IE11.

| <img width="24px" height="24px" alt="Node.js" src="https://res.cloudinary.com/dz3vsv9pg/image/upload/v1620998361/logos/nodejs.svg"></br>Node.js | <img width="24px" height="24px" alt="IE / Edge" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png"></br>IE / Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /></br>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /></br>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /></br>Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" /></br>iOS Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" /></br>Samsung | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" /></br>Opera |
| - | - | - | - | - | - | - | - |
| ^6.17.0 | IE11 / ^16 | ^60 | ^61 | ^10.1 | ^10.3 | ^8.2 | ^48 |

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
