const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename : "jcDatelib.js",
        path: path.resolve(__dirname,'dist')
    },
    devServer: {
        contentBase: './dist',
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]      
            }
        ]
    }
}