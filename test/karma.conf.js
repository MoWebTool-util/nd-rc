
module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',
    singleRun: true,
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      {
        pattern: `test/test-bundler.js`,
        watched: false,
        served: true,
        included: true
      }
    ],

    // list of files to exclude
    exclude: [
      'test/coverage/**',
      'lib/**',
      'node_modules/'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/test-bundler.js': ['webpack', 'sourcemap']
    },

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.css'],
        alias: {
          'sinon': 'sinon/pkg/sinon'
        }
      },
      module: {
        noParse: [
          ///node_modules\/sinon\//
          /\/sinon\.js/
        ],
        loaders: [{
          test: /\.jsx?$/,
          include: /src|test/,
          exclude: /node_modules/,
          loader: 'babel'
        }, {
          test: /\.json$/,
          loader: 'json'
        }, {
          test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
          loader: 'imports?define=>false,require=>false'
        }, {
          test: /\.css$/,
          loaders: [
            'style',
            'css?sourceMap&-minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            'postcss'
          ]
        }],
        preLoaders: [{
          test: /\.(js|jsx)$/,
          include: /src/,
          exclude: /node_modules/,
          loader: 'isparta'
        }]
      },
      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
        'text-encoding': 'window'
      }
    },

    reporters: ['mocha', 'coverage'],

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type : 'text-summary' },
        { type: 'lcov' }
      ]
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      noInfo: true
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    browserNoActivityTimeout: 60000
  })
}
