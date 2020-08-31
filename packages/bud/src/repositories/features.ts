import type {RepositoryDefinition} from '@roots/bud-framework'

const features: RepositoryDefinition = {
  name: 'features',
  register: {
    babel: true, // enable babel
    clean: true, // clean compiled files on every run.
    manifest: true, // generate a manifest
    postcss: true, // enable postCss

    hash: false, // hash filenames
    hot: false, // enable devServer: hot module reloading
    minify: false, // enable optimization: minify
    splitChunks: false, // separate node_modules code from project code
    runtimeChunk: false, // generate a runtime manifest (runtimeChunk)
    overlay: false, // enable WDS/BS browser overlay
    sourceMap: false, // generate source maps
    watch: false, // watch mode
  },
}

export {features}
