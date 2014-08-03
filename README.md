# grunt-sinatra

> Control your sinatra server via Grunt

## Getting Started
This plugin requires Grunt `~0.4.1` 

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sinatra --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sinatra');
```

## The "sinatra" task

### Overview
The sinatra:serve task can run without configuration by default, it will run `rackup` on the project root, serving the files on the port 9292.

####Sinatra:serve
Launches the server and whenever the the parent process ends, it terminates the server.

####Sinatra:start
Launches the server and leaves it running even when the parent process is no longer running.

####Sinatra:kill
Terminates an already running server.

###Options
pidFile

Type: `String`
Default: `'/tmp/sinatraServer.pid'`

Path to the pid file in case you wanna run the server by itself.

### Getting Started
In your project's Gruntfile, add `sinatra:serve` to the taskList object passed into `grunt.registerTask`.

```js
	grunt.registerTask('local', [
		'concat',
		'uglify',
		'sass',
		'autoprefixer',
		'cssmin',
		'assemble',
		'imagemin',
		'copy',
		'sinatra:serve',
		'open:chromium',
		'watch'
	]);
```

##Running tests
To run the test suite, first invoke the following command within the repo, installing the development dependencies:
```shell
$ npm install
```
Then run the tests:
```shell
$ make tests
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
