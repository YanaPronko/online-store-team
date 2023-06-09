declare const _exports: {
    target: string;
    entry: string;
    output: {
        path: string;
        filename: string;
    };
    resolve: {
        extensions: string[];
    };
    devServer: {
        watchFiles: string;
        compress: boolean;
        port: number;
        hot: boolean;
    };
    module: {
        rules: ({
            test: RegExp;
            loader: string;
        } | {
            test: RegExp;
            use: (string | {
                loader: string;
                options: {};
            })[];
        })[];
    };
    plugins: any[];
};
export = _exports;
