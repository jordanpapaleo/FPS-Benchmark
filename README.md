# FPS-Benchmark

This is to be used for collecting frame per second statistics on an appilcation using request animation frames.
 
# Installation

###Before you start, tools you will need:

* Download and install [git](http://git-scm.com/downloads)
* Download and install [nodeJS](http://nodejs.org/download/)
* Install bower `npm install -g bower`

###Inside of your app:

* Run `bower install fps-benchmark`
* Add the following to your index.html

```html
  <script src="bower_components/fps-benchmark/dist/fps-benchmark.min.js"></script>
  <script>FPS.init()</script>
```

# Support
* Please submit issues as Github issues.  

# Todo
* Add a shim for browsers that do not support request animation framework
* Put file in a CDN
