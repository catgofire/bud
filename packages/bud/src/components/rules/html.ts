import type {Framework, Factory, Rule} from '@roots/bud-typings'

export const test: Factory<Rule.Conditional> = ({patterns}) =>
  patterns.get('html')

export const use: Factory<Rule.Use, Framework> = ({build}) => [
  build.getItem('raw'),
]
