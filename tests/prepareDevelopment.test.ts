import { exec } from 'child_process'

import { prepareDevelopment } from '../src/prepareDevelopment'

jest.mock('child_process')

describe(prepareDevelopment, (): void => {
  it('do all the preparations funds an app and runs it (sets core)', async (): Promise<void> => {
    await prepareDevelopment()

    expect(exec).toHaveBeenCalledWith('cd .. && git clone git://github.com/universal-packages/universal-package-1.git', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ../universal-package-1 && git pull', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ../universal-package-1 && npm i', expect.anything(), expect.anything())

    expect(exec).toHaveBeenCalledWith('cd .. && git clone git://github.com/universal-packages/universal-package-2.git', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ../universal-package-2 && git pull', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ../universal-package-2 && npm i', expect.anything(), expect.anything())

    expect(exec).toHaveBeenCalledWith('cd .. && git clone git://github.com/universal-packages/universal-package-3.git', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ../universal-package-3 && git pull', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ../universal-package-3 && npm i', expect.anything(), expect.anything())

    expect(exec).toHaveBeenCalledWith('cd .. && git clone git://github.com/universal-packages/universal-package-4.git', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ../universal-package-4 && git pull', expect.anything(), expect.anything())
    expect(exec).toHaveBeenCalledWith('cd ../universal-package-4 && npm i', expect.anything(), expect.anything())
  })
})
