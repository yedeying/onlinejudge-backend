const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');

const alias = {};

// keep same as tsconfig's path
const aliasDirs = ['./src', './src/common'];
for (const aliasDir of aliasDirs) {
  for (const module of fs.readdirSync(path.resolve(__dirname, aliasDir))) {
    const realModule = module.includes('.') ? module.split('.')[0] : module;
    alias[`$${realModule}`] = path.resolve(aliasDir, realModule);
  }
}

module.exports = (env = 'development') => ({
  mode: env,
  entry: './src/index.ts',
  devtool: 'inline-sourcemap',
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias
  },
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  stats: {
    version: false,
    source: false,
    reasons: false,
    modules: false,
    hash: false,
    timings: false,
    chunkOrigins: false,
    cachedAssets: false,
    moduleTrace: false,
    children: false,
    chunks: false
  }
});
