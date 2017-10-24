const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

const srcDir = join(__dirname, 'src')
const themesDir = join(srcDir, 'themes')

const getDirectories = dir => readdirSync(dir)
  .filter(name => lstatSync(join(dir, name)).isDirectory())

const dist = join(srcDir, '..', '..', '..', 'dist', 'examples', 'twitter')

const languageModule = join(srcDir, 'language', process.env.LANGUAGE || 'en')
console.log('Language data will be loaded from', languageModule)

module.exports = getDirectories(themesDir).map(themeName => ({
  devServer: {
    contentBase: join(srcDir, 'documentation'),
    port: process.env.PORT || 3000,
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/theme\:([^\/]+)\//,
          to: data => {
            return `/${data.match[1]}/dev.html`
          }
        }
      ]
    },
    compress: false,
    inline: true,
    hot: true
  },
  devtool: 'source-map',
  entry: {
    index: `./src/themes/${themeName}`
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'public/fonts/[name].[ext]',
          outputPath: `${themeName}/`
        }
      },
      {
        test: /\.(html|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: `${themeName}/`
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        include: [
          srcDir,
          join(__dirname, 'node_modules', 'prange')
        ],
        loader: {
          loader: 'babel-loader',
          options: {
            presets: ['stage-1'],
            plugins: [
              [ 'transform-react-jsx', { pragma: 'h' } ]
            ]
          }
        }
      }
    ]
  },
  output: {
    path: dist,
    filename: `${themeName}/[name].js`,
    publicPath: '/'
  },
  resolve: {
    alias: {
      // Node modules
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      'handsontable': 'handsontable-pro',

      // Local source
      config: join(srcDir, 'config', process.env.ENV || 'dev'),
      elements: join(srcDir, 'elements'),
      language: languageModule,
      logic: join(srcDir, 'logic'),
      scenes: join(srcDir, 'scenes'),
      styles: join(srcDir, 'styles'),
      theme: join(themesDir, themeName)
    },
    extensions: ['.js', '.jsx']
  }
}))
