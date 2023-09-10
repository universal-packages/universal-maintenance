# Maintenance

[![npm version](https://badge.fury.io/js/@universal-packages%2Fmaintenance.svg)](https://www.npmjs.com/package/@universal-packages/maintenance)
[![Testing](https://github.com/universal-packages/universal-maintenance/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-maintenance/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-maintenance/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-maintenance)

Universal packages maintenance tool. This is an internal tool to keep universal packages healthy and up to date.

## Install

```shell
npm install @universal-packages/maintenance --save-dev
```

## CLI

### update-dependents

Finds all universal packages that depends on the current package and updates them to the latest version. This is to clone their repos, update the package and create commits and push them.

```shell
umaintenance update-dependents
```

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
