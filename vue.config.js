const path = require('path');
module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "José Rafael Gutierrez | Developer Full Stack";
                return args;
            })
    },
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, 'src/')
            }
        },
        watchOptions: {
            poll: true
        }
    },
}
