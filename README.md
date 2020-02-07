<img src="https://temtem-api.mael.tech/images/portraits/temtem/large/Ganki.png" height="100" align="right" />

# Temtem API

A JSON API to return data about the game [Temtem](https://crema.gg/games/temtem/) from the [Official Wiki](https://temtem.gamepedia.com/), that is updated every 4 hours.

## Install

```sh
git clone git@github.com:maael/temtem-api.git
cd temtem-api
yarn
```

I used `node@10.17.0` to develop it.

## NPM Scripts

| Script           | Description                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| `dev`            | Starts the local development server on `http://localhost:3000`, or whatever `PORT` is specified in env. |
| `build`          | Builds server.                                                                                          |
| `start`          | Started built server.                                                                                   |
| `lint`           | Runs [tslint](https://www.npmjs.com/package/tslint) against project.                                    |
| `prettier`       | Runs [prettier](https://www.npmjs.com/package/prettier) against project, writing corrections.           |
| `prettier:check` | Runs [prettier](https://www.npmjs.com/package/prettier) against project, used by CI to check project.   |
| `test`           | ⚠️ TODO ⚠️                                                                                              |
| `data`           | Runs data fetching scripts.                                                                             |
| `assets`         | Runs asset fetching scripts.                                                                            |
| `summary`        | Generates summary of fetched data.                                                                      |
| `sync`           | Sequentially runs `yarn data`, `yarn assets`, and `yarn summary`.                                       |
| `push`           | Pushes `./data` and `./public` changes to GitHub.                                                       |
| `sync:push`      | Sequentially runs `yarn sync` followed by `yarn push`.                                                  |

## Config

| Environment Variable | Description                                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| `CIRCLECI_TOKEN`     | Token for [CircleCI](http://circleci.com/), used in the `/api/info` endpoint to get status of last build. |
| `GA_TOKEN`           | Token for google analytics, used on server to see API endpoint usage numbers.                             |

## Endpoints

| URL                       | Docs                                                  |
| ------------------------- | ----------------------------------------------------- |
| `/api/temtems`            | https://temtem-api.mael.tech/#/api/temtems            |
| `/api/temtems/[number]`   | https://temtem-api.mael.tech/#/api/temtems/number     |
| `/api/types`              | https://temtem-api.mael.tech/#/api/types              |
| `/api/conditions`         | https://temtem-api.mael.tech/#/api/conditions         |
| `/api/techniques`         | https://temtem-api.mael.tech/#/api/techniques         |
| `/api/traits`             | https://temtem-api.mael.tech/#/api/traits             |
| `/api/gear`               | https://temtem-api.mael.tech/#/api/gear               |
| `/api/quests`             | https://temtem-api.mael.tech/#/api/quests             |
| `/api/cosmetics`          | https://temtem-api.mael.tech/#/api/cosmetics          |
| `/api/dyes`               | https://temtem-api.mael.tech/#/api/dyes               |
| `/api/patches`            | https://temtem-api.mael.tech/#/api/patches            |
| `/api/weaknesses`         | https://temtem-api.mael.tech/#/api/weaknesses         |
| `/api/weakness/calculate` | https://temtem-api.mael.tech/#/api/weakness/calculate |
| `/api/breeding`           | https://temtem-api.mael.tech/#/api/breeding           |

## Data / Asset Fetching

The data and asset scripts can be found in `./scripts/data` and `./scripts/assets`.

The data scripts are executed first, with `get[Entity]` which gets the list of items with basic information from a category page or something similar, followed by `embellish[Entity]`, that goes to each items page directly to embellish it with extra information. The data files are written to the `./data` directory.

[got](https://www.npmjs.com/package/got) is used as the request library, and [cheerio](https://www.npmjs.com/package/cheerio) is used to parse the fetched HTML.

Once the data scripts are done, assets are collected, usually from items found in the data scripts execution and in the resulting `.json` files in `./data`.

After this a summary file is created, listing all produced data files, and when they were updated.

Then the files in `./data` are checked against codecs in `./scripts/checker/codecs` to see if the produced shapes conform to what's expected, using [io-ts](https://github.com/gcanti/io-ts).

The `./data` and `./public` directories are then pushed to GitHub, where [now](https://github.com/zeit/now) will deploy the changes.

## Types

Some extremely fuzzy and out of date types are available from [@maael/temtem-types](https://www.npmjs.com/package/@maael/temtem-types).

## Contributing

- Make sure `prettier` has been run, it should do it as a pre-commit hook thanks to [husky](https://www.npmjs.com/package/husky) and [pretty-quick](https://www.npmjs.com/package/pretty-quick).

Also fair warning, I made this quick, so while it is Typescript, it's super loose with `any`s all over the place.

## Todo

- [ ] Breeding API endpoint
- [ ] Maybe automatic typing with [quicktype](https://app.quicktype.io/) or something
- [ ] Finish making data available under graphql endpoint. ([minimal example here](https://github.com/zeit/next.js/pull/7804/files))
- [ ] Fix [this TODO](./scripts/data/embellishTechniques.ts#L74-L81) for technique synergy data.
