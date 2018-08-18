module.exports = [
  {
    entry: './css/app.css',
    output: {
      // This is necessary for webpack to compile
      // But we never use style-bundle.js
      filename: 'style-bundle.js',
    },
    module: {
      rules: [{
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules'],
            }
          },
        ]
      }]
    },
  },
  {
    entry: "./js/app.js",
    output: {
      filename: "bundle.js"
    },
    resolve: {
      alias: {
        vue: 'vue/dist/vue.js'
      }
    }
  }
];
