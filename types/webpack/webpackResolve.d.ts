/**
 * Webpack resolvers.
 *
 * @param {object}
 */
declare const webpackResolve: (bud: any) => {
    bud: any;
    options: {
        resolve: {
            extensions: string[];
            modules: any[];
            alias: any;
        };
    };
    make: () => any;
};
export { webpackResolve };
//# sourceMappingURL=webpackResolve.d.ts.map