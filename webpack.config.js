const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'inline-source-map',
    entry: {
      renderer: './public/renderer.js',
      socialDecoder: './src/renderer/social-decoder-bridge.ts',
      taskBreakdownEngine: './src/renderer/engines/TaskBreakdownEngine.ts',
      taskBreakdownStore: './src/renderer/stores/task-breakdown-store.ts', 
      taskBreakdownComponent: './src/renderer/components/TaskBreakdownComponent.tsx',
      velvetReactApp: './src/renderer/components/index.tsx',
      preload: './src/main/preload.js'
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].bundle.js',
      clean: true
    },
    target: 'electron-renderer',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                jsx: 'react-jsx'
              }
            }
          },
          exclude: /node_modules/
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    optimization: {
      minimize: isProduction,
      splitChunks: {
        chunks: 'all'
      }
    },
    externals: {
      'electron': 'commonjs electron'
    }
  };
};