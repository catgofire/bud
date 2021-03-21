import {Service} from './Service'
import {Container} from './Container'
import {Compiler as WebpackCompiler} from 'webpack'
import {Application, Handler} from 'express'
import DevMiddleware from 'webpack-dev-middleware'
import Proxy from 'http-proxy-middleware'
import {WatchOptions} from 'chokidar'

export abstract class Server extends Service {
  middleware: Server.Middleware.Inventory

  assets: string[]

  instance: Server.Instance

  config: Server.Config

  watchlist: string[]

  watchable: boolean

  run(compiler: Server.Compiler): this

  inject(): void
}

export namespace Server {
  export type Compiler = WebpackCompiler
  export type Instance = Application
  export type Middleware = any

  export namespace Middleware {
    export interface Inventory {
      [key: string]: Middleware
    }

    export interface Options {
      config: Config
      compiler: Compiler
    }

    export type Init = (options: Options) => Middleware

    export type Proxy = Proxy.RequestHandler & Handler
    export interface Target {
      host: string
      port: number
    }
  }

  /**
   * Configuration container
   */
  export type Config = Container<Configuration>

  /**
   * Server configuration
   */
  export interface Configuration {
    /**
     * If particular middlewares are enabled
     */
    middleware?: {
      [key: string]: boolean
    }

    /**
     * The development server host
     * @example example.test
     */
    host?: string

    /**
     * The development server port
     * @example 3000
     */
    port?: number

    /**
     * Proxy destination
     */
    proxy?: {
      /**
       * Proxy destination host
       * @example localhost
       */
      host?: string

      /**
       * Proxy destination port
       * @example 3000
       */
      port?: number
    }

    /**
     * Files which should reload the browser when changed.
     */
    watch?: {
      files: string[]
      options: WatchOptions
    }

    /**
     * Client features
     */
    browser: {
      log: boolean
      indicator: true
    }

    /**
     * Hot module reloading enabled
     */
    hot?: boolean

    /**
     * The index path for web server, defaults to "index.html".
     */
    index?: DevMiddleware.Options['index']

    /**
     * Set the default file system which will be used by webpack as primary destination of generated files
     */
    fs?: DevMiddleware.Options['fs']

    /**
     * The path that the middleware is bound to.
     */
    publicPath?: DevMiddleware.Options['publicPath']

    /**
     * Filename to serve as index.
     */
    filename?: DevMiddleware.Options['filename']

    /**
     * This property for  passing  custom
     * HTTP headers on each request.
     *
     * ### Example
     *
     * ```json
     * { "X-Custom-Header": "yes" }
     * ```
     */
    headers?: DevMiddleware.Options['headers']

    /**
     * Defines the level of messages logged by Express/WDS middleware
     */
    logLevel?: DevMiddleware.Options['logLevel']

    /**
     * This property for  passing  the
     * list of HTTP request methods accepted
     *
     * ### Example
     *
     * ```json
     * ['GET', 'HEAD']
     * ```
     */
    methods?: DevMiddleware.Options['methods']

    /**
     * This property for  to register custom
     * mime types or extension mappings
     */
    mimeTypes?:
      | DevMiddleware.MimeTypeMap
      | DevMiddleware.OverrideMimeTypeMap
      | null

    /**
     * Instructs the module to enable or disable the s
     * erver-side rendering mode
     */
    serverSideRender?: DevMiddleware.Options['serverSideRender']

    /**
     * Proxy setting: object passed to  https.createServer
     */
    ssl?: Proxy.Options['ssl']

    /**
     * Proxy setting: set to true to verify SSL certificates
     */
    secure?: Proxy.Options['secure']

    /**
     * Proxy setting: rewrite the location host/port on (301/302/307/308) redirects based on requested host/port.
     */
    autoRewrite?: Proxy.Options['autoRewrite']

    /**
     * Proxy setting: change the origin of the host header to the target URL
     */
    changeOrigin?: Proxy.Options['changeOrigin']

    /**
     * Escape hatch for Webpack's host check security feature.
     */
    disableHostCheck?: DevMiddleware.Options[]

    /**
     * Proxy setting: specify whether you want to follow redirects
     */
    followRedirects?: Proxy.Options['followRedirects']
  }
}
