export default async function fetch(url: string): Promise<any> {
  return {
    json: async (): Promise<any> => {
      if (url.includes('https://registry.npmjs.org/-/v1/search')) {
        return {
          objects: [
            {
              package: {
                name: '@universal-packages/package-1',
                version: '1.0.0'
              }
            },
            {
              package: {
                name: '@universal-packages/package-2',
                version: '1.0.0'
              }
            },
            {
              package: {
                name: '@universal-packages/package-3',
                version: '1.0.0'
              }
            },
            {
              package: {
                name: '@universal-packages/package-4',
                version: '1.0.0'
              }
            }
          ]
        }
      } else {
        if (url.includes('package-1')) {
          return {
            name: '@universal-packages/package-1',
            dependencies: {
              '@universal-packages/maintenance': '1.0.0'
            },
            repository: 'git://github.com/universal-packages/universal-package-1.git'
          }
        }
        if (url.includes('package-2')) {
          return {
            name: '@universal-packages/package-2',
            peerDependencies: {
              '@universal-packages/maintenance': '1.0.0'
            },
            repository: 'git://github.com/universal-packages/universal-package-2.git'
          }
        }
        if (url.includes('package-3')) {
          return {
            name: '@universal-packages/package-3',
            optionalDependencies: {
              '@universal-packages/maintenance': '1.0.0'
            },
            repository: 'git://github.com/universal-packages/universal-package-3.git'
          }
        }
        if (url.includes('package-4')) {
          return {
            name: '@universal-packages/package-4',
            devDependencies: {
              '@universal-packages/maintenance': '1.0.0'
            },
            repository: 'git://github.com/universal-packages/universal-package-4.git'
          }
        }
      }
    }
  }
}
