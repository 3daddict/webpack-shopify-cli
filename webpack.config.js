const glob = require('glob');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: glob.sync('./src/**/*.js').reduce((acc, path) => {
    const entry = path.replace(/^.*[\\\/]/, '').replace('.js', '');
    acc[entry] = path;
    return acc;
  }, {}),
  output: {
    filename: './assets/[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {},
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      fix: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/assets/**/*',
          to: 'assets/[name][ext]',
        },
        {
          from: 'src/config/*.json',
          to: 'config/[name].[ext]',
        },
        {
          from: 'src/locales/*.json',
          to: 'locales/[name].[ext]',
        },
        {
          from: 'src/components/**/*.liquid',
          to({ absoluteFilename }) {
            const relativePath = path.join(__dirname, 'src/components');
            const diff = path.relative(relativePath, absoluteFilename);
            const targetFolder = diff.startsWith('templates/customers/')
              ? 'templates/customers/'
              : diff.split(path.sep)[0];

            return path.join(targetFolder, path.basename(absoluteFilename));
          },
        },
        {
          from: 'src/components/**/*.json',
          to({ absoluteFilename }) {
            const relativePath = path.join(__dirname, 'src/components');
            const diff = path.relative(relativePath, absoluteFilename);
            const targetFolder = diff.startsWith('templates/customers/')
              ? 'templates/customers/'
              : diff.split(path.sep)[0];

            return path.join(targetFolder, path.basename(absoluteFilename));
          },
        },
      ],
    }),
  ],
};
