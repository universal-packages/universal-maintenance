export type PackageType = 'dev' | 'peer' | 'optional' | 'regular'

export interface Dependents {
  all: PackageVersionResult[]
  dev: PackageVersionResult[]
  peer: PackageVersionResult[]
  optional: PackageVersionResult[]
  regular: PackageVersionResult[]
}

export interface PackagesSearchResult {
  objects: {
    package: {
      name: string
      scope: string
      version: string
      description: string
      keywords: string[]
      date: string
      links: {
        npm: string
        homepage: string
        repository: string
        bugs: string
      }
      maintainers: {
        username: string
        email: string
      }[]
      publisher: {
        username: string
        email: string
      }
    }
    score: {
      final: number
      detail: {
        quality: number
        popularity: number
        maintenance: number
      }
    }
    searchScore: number
  }[]
  total: number
  time: string
}

export interface PackageVersionResult {
  name: string
  version: string
  description: string
  keywords: string[]
  date: string
  links: {
    npm: string
    homepage: string
    repository: string
    bugs: string
  }
  repository: string
  author: {
    name: string
    email: string
    url: string
  }
  bin: {
    [key: string]: string
  }
  maintainers: {
    username: string
    email: string
  }[]
  license: string
  dependencies: {
    [key: string]: string
  }
  devDependencies: {
    [key: string]: string
  }
  peerDependencies: {
    [key: string]: string
  }
  bundledDependencies: string[]
  optionalDependencies: {
    [key: string]: string
  }
  engines: {
    [key: string]: string
  }
  dist: {
    integrity: string
    shasum: string
    tarball: string
    fileCount: number
    unpackedSize: number
    'npm-signature': string
    signatures: {
      keyid: string
      sig: string
    }[]
  }
  directories: {
    [key: string]: string
  }
  readme: string
  readmeFilename: string
  _id: string
  _npmVersion: string
  _nodeVersion: string
  _npmUser: {
    name: string
    email: string
  }
  distTags: {
    [key: string]: string
  }
  _npmOperationalInternal: {
    host: string
    tmp: string
  }
  _hasShrinkwrap: boolean
}
