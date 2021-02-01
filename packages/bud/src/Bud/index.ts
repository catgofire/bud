import '@roots/bud-api'
import type {
  Api,
  Build,
  Cache,
  CLI,
  Compiler,
  Constructor,
  Container,
  Env,
  Express,
  Extensions,
  Extension,
  Factory,
  Disk,
  Fluent,
  GlobTask,
  Module,
  Hooks,
  Index,
  Item,
  Loader,
  Logger,
  MaybeCallable,
  Options,
  Providers,
  Run,
  Rule,
  Server,
  Service,
  Use,
  Webpack,
  When,
} from '@roots/bud-typings'
import {Framework, Discovery} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  export interface Framework {
    /**
     * ## bud.devtool  [💁 Fluent]
     *
     * Enable and configure sourcemaps using any of Webpack's
     * [devtool utilities](https://webpack.js.org/configuration/devtool/).
     *
     * [🔗 Documentation](#)
     *
     * ### Usage
     *
     * ```js
     * bud.devtool('inline-cheap-module-source-map')
     * ```
     */
    devtool: Api.Devtool<this>

    /**
     * ## bud.distPath [💁 Fluent]
     *
     * Sets the directory where assets will be built to.
     *
     * By default this directory is set as `dist`. [🔗 Documentation](#)
     *
     * ### Usage
     *
     * ```js
     * bud.distPath('build')
     * ```
     */
    distPath: Api.DistPath<this>

    /**
     * ## bud.entry  [💁 Fluent]
     *
     * Define groups of files to be bundled together. [🔗 Documentation](#)
     *
     * ### Usage
     *
     * ```js
     * bud.entry('app', 'app.js')
     * ```
     *
     * ```js
     * bud.entry('app', ['app.js', 'app.css'])
     * ```
     */
    entry: Api.Entry<this>

    /**
     * ## bud.externals  [💁 Fluent]
     *
     * Specify a non-standard resolution strategy for modules
     * with a matching name. [🔗 Documentation](#)
     *
     * ### Usage
     *
     * ```js
     * bud.externals({
     *   'jQuery': 'window.jquery',
     * })
     */
    externals: Api.Externals<this>

    /**
     * ## bud.glob  [💁 Fluent]
     *
     * Generate an entrypoint from assets matching a
     * [fast-glob](https://git.io/JkGbw) formatted string. [🔗 Documentation](#)
     *
     * ### Globbing
     *
     * **Supported patterns**
     *
     * - `*` matches any number of characters, but not `/`
     * - `?` matches a single character, but not `/`
     * - `**` matches any number of characters, including `/`, as long as it's theonly thing in a path part
     * - `{}` allows for a comma-separated list of "or" expressions
     * - `!` at the beginning of a pattern will negate the match
     *
     * ### Usage
     *
     * Create an app bundle comprised of all js assets in the src root:
     *
     * ```js
     * bud.glob('app', '*.js')
     * ```
     */
    glob: Api.Glob<this>

    /**
     * ## bud.hash  [💁 Fluent]
     *
     * Enable filename hashing of built assets. [🔗 Documentation](#)
     *
     * ### Usage
     *
     * ```js
     * bud.hash()
     * ```
     */
    hash: Api.Hash<this>

    /**
     * ## bud.minify  [💁 Fluent]
     *
     * `bud.minify` enables minification of static assets. [🔗 Documentation](#)
     *
     * ### Usage
     *
     * ```js
     * bud.minify()
     * ```
     */
    minify: Api.Minify<this>

    /**
     * ## bud.projectPath [💁 Fluent]
     *
     * Set the root directory reference.
     *
     * By default this directory is set as the current working dir. [🔗 Documentation](#)
     *
     * ### Usage
     *
     * ```js
     * bud.projectPath('build')
     * ```
     */
    projectPath: Api.ProjectPath<this>

    /**
     * ## bud.proxy  [💁 Fluent]
     *
     * Set proxy settings for the development server.
     *
     * - [🔗 Documentation](#)
     *
     * ### Usage
     *
     * ```js
     * bud.proxy()
     * ```
     *
     * ```js
     * bud.proxy({
     *  host: 'example.test',
     *  port: 3000,
     * })
     * ```
     */
    proxy: Api.Proxy<this>

    /**
     * ## bud.publicPath  [💁 Fluent]
     *
     * By default it is assumed that assets are served from webroot (`/`).
     * You can use this method to replace this value for apps  served from
     * a subdirectory. [🔗 Documentation](#)
     *
     * ### Usage
     *
     * #### Set the default path for a [@roots/sage project](https://github.com/roots/sage)
     *
     * ```js
     * bud.publicPath('/app/themes/sage/dist')
     * ```
     */
    publicPath: Api.PublicPath<this>

    /**
     * ## bud.runtime  [💁 Fluent]
     *
     * Generate a runtime chunk intended to be inlined on the page.
     *
     * Useful for code splitting and dynamic imports. [🔗 Documentation](#)
     *
     * ### Usage
     *
     * ```js
     * bud.runtime()
     * ```
     */
    runtime: Api.Runtime<this>

    /**
     * ## bud.srcPath [💁 Fluent]
     *
     * Sets the root directory for source files.
     *
     * By default this directory is set as `src`. [🔗 Documentation](#)
     *
     * ### Usage
     *
     * ```js
     * bud.srcPath('build')
     * ```
     */
    srcPath: Api.SrcPath<this>

    /**
     * ## bud.string
     *
     * Interpolate to string.
     *
     * ### Usage
     *
     * ```js
     * const value = bud.env.get('some_env')
     * const stringValue = bud.string(value)
     * ```
     */
    string: Api.Stringify<this>

    /**
     * ## bud.vendor  [💁 Fluent]
     *
     * Bundle vendored modules separately from application code. [🔗 Documentation](#)
     *
     * ### Usage
     *
     * ```js
     * bud.vendor()
     * ```
     *
     * Optionally, give the vendor bundle a specific name:
     *
     * ```js
     * bud.vendor('third-party')
     * ```
     */
    vendor: Api.Vendor<this>
  }
}

/**
 * ## Bud
 *
 * A webpack framework combining the best parts of
 * Laravel Mix and Symfony Encore.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [📦 @roots/bud](https://github.io/roots/bud)
 */
class Bud extends Framework {
  /**
   * ## bud.discovery
   *
   * Internal utilty used to auto-discover Bud extensions
   */
  discovery: Bud.Discovery
}

declare namespace Bud {
  namespace Api {
    export type Mode = (
      this: Bud,
      mode?: Bud.Webpack.Configuration['mode'],
    ) => Bud | Bud.Webpack.Configuration['mode']
  }

  export {Api}
  export {Build}
  export {Cache}
  export {CLI}
  export {Compiler}
  export {Container}
  export {Discovery}
  export {Disk}
  export {Env}
  export {Extensions, Extension}
  export {Item}
  export {Module}
  export {Hooks}
  export {Loader}
  export {Logger}
  export {Options}
  export {Providers}
  export {Rule}
  export {Run}
  export {Server}
  export {Service}
  export {
    Constructor,
    Express,
    Factory,
    Fluent,
    GlobTask,
    Index,
    MaybeCallable,
    Use,
    When,
    Webpack,
  }
}

export {Bud}
