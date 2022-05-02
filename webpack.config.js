const glob = require('glob');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: glob.sync('./src/**/*.js').reduce((acc, path) => {
    const entry = path.replace(/^.*[\\\/]/, '').replace('.js', '');
    acc[entry] = path;
    return acc;
  }, {}),
  mode: 'production',
  output: {
    filename: './assets/[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    minimize: true,
  },
  watchOptions: {
    poll: true,
    ignored: /node_modules/,
    aggregateTimeout: 800,
  },
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
        test: /\.(css|sass|scss)$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './assets/[name].css',
    }),
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
          to: 'config/[name][ext]',
        },
        {
          from: 'src/locales/*.json',
          to: 'locales/[name][ext]',
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
