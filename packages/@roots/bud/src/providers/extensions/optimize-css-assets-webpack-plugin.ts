import Plugin from 'optimize-css-assets-webpack-plugin'
import {Module} from '@roots/bud-typings'

export const name = 'optimize-css-assets-webpack-plugin'

export const options: Module.Options<Plugin.Options> = {
  assetNameRegExp: /\.css$/g,
  cssProcessor: require('cssnano'),
  cssProcessorPluginOptions: {
    preset: ['default', {discardComments: {removeAll: true}}],
  },
  canPrint: true,
}

export const make: Module.Make<
  Plugin,
  Plugin.Options
> = options => new Plugin(options.all())

export const when: Module.When = app =>
  app.store.enabled('options.minify')
