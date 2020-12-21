import {Webpack, Framework} from '@roots/bud-typings'
import {rules} from './rules'

type Cfg = Webpack.Configuration['module']
type Module = (this: Framework) => {module: Cfg}

export const moduleBuilder: Module = function () {
  return {
    module: this.hooks.filter<Cfg>('webpack.module', {
      ...this.config.get('module'),
      ...rules.bind(this)(),
      noParse: this.hooks.filter<
        Webpack.Configuration['module']['noParse']
      >(
        'webpack.module.noParse',
        this.config.get('module.noParse'),
      ),
    }),
  }
}
