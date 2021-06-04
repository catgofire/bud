import {Framework, setupBud, teardownBud} from '../../util'

describe('bud.publicPath', function () {
  let bud: Framework

  beforeEach(() => {
    bud = setupBud()
  })

  afterEach(() => {
    teardownBud(bud)
  })

  it('publicPath: is a function', () => {
    expect(bud.publicPath).toBeInstanceOf(Function)
  })

  it('publicPath: returns the correct default publicPath', () => {
    expect(bud.publicPath()).toEqual('/')
    expect(bud.publicPath()).toEqual(
      bud.build.config.output.publicPath,
    )
  })

  it('setPublicPath: is a function', () => {
    expect(bud.setPublicPath).toBeInstanceOf(Function)
  })

  it('setPublicPath: sets publicPath when called', () => {
    const newPath = '/foo'

    bud.setPublicPath(newPath)
    const returnedPath = bud.publicPath()

    expect(returnedPath).toEqual(newPath)
    expect(bud.build.config.output.publicPath).toEqual(newPath)
  })
})

export {}
