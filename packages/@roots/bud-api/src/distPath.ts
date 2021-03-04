import {Framework} from '@roots/bud-framework'
import {isEqual} from 'lodash'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## distPath [💁 Fluent]
     *
     * Sets the directory where assets will be built to.
     *
     * By default this directory is set as `dist`. [🔗 Documentation](#)
     *
     * ### Usage
     *
     * ```js
     * app.distPath('build')
     * ```
     */
    distPath: Framework.Api.DistPath
  }

  namespace Framework.Api {
    export type DistPath = (
      this: Framework,
      segment: string,
    ) => Framework
  }
}

export const distPath: Framework.Api.DistPath = function (
  segment,
) {
  /** Bounce early if dist is overwritten from CLI */
  if (this.store.isString('args.dist')) return this

  this.store.set(
    'locations.dist',
    isEqual(segment.split('').pop(), '/')
      ? segment
      : `${segment}/`,
  )

  return this
}
