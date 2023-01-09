declare function _exports({ file, options, env }: {
    file: any;
    options: any;
    env: any;
}): {
    parser: boolean;
    plugins: {
        'postcss-import': {};
        'postcss-cssnext': {};
        cssnano: {};
    };
};
export = _exports;
