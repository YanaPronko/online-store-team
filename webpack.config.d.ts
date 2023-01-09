export const target: string;
export const entry: string;
export namespace output {
    const path: string;
    const filename: string;
}
export namespace resolve {
    const extensions: string[];
}
export namespace devServer {
    const watchFiles: string;
    const compress: boolean;
    const port: number;
    const hot: boolean;
}
export namespace module {
    const rules: ({
        test: RegExp;
        loader: string;
        use?: undefined;
    } | {
        test: RegExp;
        use: (string | {
            loader: string;
            options: {};
        })[];
        loader?: undefined;
    })[];
}
export const plugins: any[];
