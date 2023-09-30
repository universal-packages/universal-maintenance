import { exec } from 'child_process'

import { updateDependents } from '../src/updateDependents'

jest.mock('child_process')

describe(updateDependents, (): void => {
  it('do all the preparations funds an app and runs it (sets core)', async (): Promise<void> => {
    await updateDependents()

    expect(exec).toHaveBeenCalledWith('mkdir -p ./tmp', expect.anything(), expect.anything())

    expect(exec).toHaveBeenCalledWith('cd ./tmp && git clone git://github.com/universal-packages/universal-package-1.git', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-1 && npm i', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-1 && npm i @universal-packages/maintenance@latest', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-1 && git add .', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-1 && git commit -m "Update @universal-packages/maintenance"', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-1 && npm version patch', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-1 && git push', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-1 && git push --tags', expect.anything(), expect.anything())

    expect(exec).toHaveBeenCalledWith('cd ./tmp && git clone git://github.com/universal-packages/universal-package-2.git', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-2 && npm i', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-2 && npm i @universal-packages/maintenance@latest --save-peer', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-2 && git add .', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-2 && git commit -m "Update @universal-packages/maintenance"', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-2 && npm version patch', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-2 && git push', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-2 && git push --tags', expect.anything(), expect.anything())

    expect(exec).toHaveBeenCalledWith('cd ./tmp && git clone git://github.com/universal-packages/universal-package-3.git', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-3 && npm i', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-3 && npm i @universal-packages/maintenance@latest --save-optional', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-3 && git add .', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-3 && git commit -m "Update @universal-packages/maintenance"', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-3 && git push', expect.anything(), expect.anything())

    expect(exec).toHaveBeenCalledWith('cd ./tmp && git clone git://github.com/universal-packages/universal-package-4.git', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-4 && npm i', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-4 && npm i @universal-packages/maintenance@latest --save-dev', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-4 && git add .', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-4 && git commit -m "Update @universal-packages/maintenance"', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ./tmp/universal-package-4 && git push', expect.anything(), expect.anything())

    expect(exec).toHaveBeenCalledWith('rm -rf ./tmp', expect.anything(), expect.anything())
  })
})
