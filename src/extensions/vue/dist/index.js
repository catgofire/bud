"use strict";
const adapter = () => ({
    make: function () {
        const { VueLoaderPlugin } = require('vue-loader');
        return new VueLoaderPlugin();
    },
});
const vue = () => ({
    make: function () {
        this.bud.features.enable('vue');
        this.bud.options.set('extensions', [
            '.vue',
            ...this.bud.options.get('extensions'),
        ]);
        this.bud.alias({ vue$: 'vue/dist/vue.common.js' });
        this.bud.hooks.on('webpack.module.rules', this.addVue);
        this.bud.hooks.on('webpack.module.rules.css.use', this.addVueStyle);
        this.bud.hooks.on('webpack.module.rules.scss.use', this.addVueStyle);
        this.bud.adapters.add(adapter);
    },
    /**
     * addVue
     *
     * Callback adding vue-loader to webpack.modules.
     */
    addVue: (webpackModules) => [
        {
            test: /\.vue$/,
            use: [
                {
                    loader: require.resolve('vue-loader'),
                    compiler: require('vue-template-compiler'),
                },
            ],
        },
        ...webpackModules,
    ],
    /**
     * addVueStyle
     *
     * Callback adding vue-style-loader to webpack.modules.
     */
    addVueStyle: (rules) => [
        'vue-style-loader',
        ...rules,
    ],
});
module.exports = vue;
//# sourceMappingURL=index.js.map