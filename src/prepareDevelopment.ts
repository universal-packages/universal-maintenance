import { execCommand } from './common/execCommand'
import { fetchUniversalPackages } from './common/fetchUniversalPackages'

export async function prepareDevelopment(): Promise<void> {
  const universalPackages = await fetchUniversalPackages()

  for (let i = 0; i < universalPackages.length; i++) {
    const universalPackage = universalPackages[i]
    const repoName = universalPackage.name.replace('@universal-packages/', 'universal-')

    await execCommand(`cd .. && git clone ${universalPackage.repository}`, { continueOnError: true })
    await execCommand(`cd ../${repoName} && git pull`)
    await execCommand(`cd ../${repoName} && npm i`)
  }
}
