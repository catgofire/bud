"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const api_1 = require("./api");
const loaders_1 = __importDefault(require("./loaders"));
/**
 * Sass webpack module rule.
 */
const rule = (bud) => ({
    test: /\.s(c|a)ss$/,
    exclude: bud.patterns.get('vendor'),
    use: [
        loaders_1.default.miniCss(bud),
        loaders_1.default.css(bud),
        loaders_1.default.resolveUrl(bud),
        loaders_1.default.postCss(bud),
        loaders_1.default.sass(bud),
    ],
});
const sass = () => ({
    make: function () {
        /**
         * Enable sass support
         */
        this.bud.features.set('sass', true);
        /**
         * Add bud.sass method.
         */
        this.bud.sass = api_1.config;
        /**
         * Add sass rule to webpack modules repository.
         */
        this.bud.rules.repository = [
            ...this.bud.rules.repository,
            (bud) => rule(bud),
        ];
    },
});
module.exports = sass;
//# sourceMappingURL=index.js.map