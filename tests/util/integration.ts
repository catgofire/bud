import {readFileSync} from 'fs'
import {posix} from 'path'

import execa from 'execa'
import {readFile, readJson, writeFile} from 'fs-extra'
import {format} from 'prettier'

import {error, log, success} from './index'

export interface Assets {
  [key: string]: string
}
export interface Entrypoints {
  [key: string]: {
    js?: string[]
    css?: string[]
    dependencies?: string[]
  }
}

export function helper(
  name: string,
  dir?: string,
  dist?: string,
  publicPath?: string,
) {
  const project: {
    name: string
    json: string
    dir: string
    dist: string
  } = {
    name,
    json: '',
    dir: dir
      ? posix.normalize(`${process.cwd()}/${dir}`)
      : process.cwd(),
    dist: dist ?? 'dist',
  }

  project.json = readFileSync(
    projectPath('package.json'),
    'utf8',
  )

  function projectPath(file: string): string {
    return posix.normalize(`${project.dir}/${file}`)
  }

  function distPath(file: string) {
    return posix.normalize(
      projectPath(`${project.dist}/${file}`),
    )
  }

  const usedPublicPath = (): string | false =>
    publicPath ? publicPath : false

  async function manifest() {
    let json: {[key: string]: any} = await readJson(
      distPath('manifest.json'),
    )

    /**
     * If publicPath is configured, we need to remove from
     * entries or they won't resolve
     */
    if (usedPublicPath()) {
      json = Object.entries(json).reduce(
        (a, [k, v]): Assets => ({
          ...a,
          [k]: v.replace(usedPublicPath(), ''),
        }),
        {},
      )
    }

    return json
  }

  async function assets() {
    let assetHash: {[key: string]: string} = await manifest()

    const built = await Object.entries(assetHash).reduce(
      async (promised: Promise<any>, [name, path]) => {
        const assets = await promised
        const buffer = await readFile(distPath(path), 'utf8')

        return {
          ...assets,
          [name]: buffer.toString(),
        }
      },
      Promise.resolve(),
    )

    return built
  }

  async function yarn(...opts: string[]): Promise<void> {
    log(name, `yarn ${opts.join(' ')}`)

    const {stderr, stdout} = await execa('yarn', opts, {
      cwd: project.dir,
    })

    stderr && error(name, `yarn ${opts.join(' ')}`, stderr)
    stdout && success(name, `yarn ${opts.join(' ')}`, stdout)

    return
  }

  async function setup(mode = 'production') {
    await yarn('bud', 'init')
    await yarn('bud', `build:${mode}`, '--ci', '--debug')

    const built = await assets()
    return built
  }

  async function teardown() {
    await writeFile(
      projectPath('package.json'),
      format(project.json, {parser: 'json'}),
    )

    success(name, 'restore package.json')
    return true
  }

  return {
    name,
    project,
    projectPath,
    distPath,
    yarn,
    manifest,
    setup,
    teardown,
  }
}
