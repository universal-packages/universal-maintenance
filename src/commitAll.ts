import { traverse } from '@universal-packages/directory-traversal'

import { execCommand } from './common/execCommand'

export async function commitAll(message: string): Promise<void> {
  const directoryMap = await traverse('../', { maxDepth: 0 })
  const universalPackagesPaths = directoryMap.directories.map((directory) => directory.basename).filter((path) => path.startsWith('universal-'))

  for (let i = 0; i < universalPackagesPaths.length; i++) {
    const repoName = universalPackagesPaths[i]

    await execCommand(`cd ../${repoName} && git add .`)
    await execCommand(`cd ../${repoName} && git commit -m "${message}"`)
    await execCommand(`cd ../${repoName} && git push`)
  }
}
