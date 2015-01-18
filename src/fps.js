/**
 * Fps Benchmark
 * @version v0.1.0
 * @link https://github.com/jordanpapaleo/
 * @license MPL v2.0
 */

(function() {
    var FPS = {
        props:  {
            frames: 0,
            startTime: undefined,
            endTime: undefined,
            isCollecting: false, //The state of whether data is being collected
            collectedFPS: [], //All the FPS readings
            collectionRate: 500 //Rate at which FPS is recorded
        }
    };

    FPS.init = function(config) {
        if(config) {
            this.config = config;
        } else {
            this.config = {
                duration: 5000
            }
        }

        this.appendFlashScreen();
        this.start();
    };

    // We add a DOM node to be used in visual notifications
    FPS.appendFlashScreen = function() {
        var div = document.createElement('div');
            div.id = 'flashScreen';
            div.style.position = "absolute";
            div.style.top = 0;
            div.style.bottom = 0;
            div.style.left = 0;
            div.style.right = 0;
            div.style.zIndex = 1000000;
            div.style.display = "none";
            div.style.opacity = .75;

        document.body.appendChild(div);
    };

    // Used to activate the visual notification for the end FPS recording
    FPS.flashScreen = function(status) {
        var flashScreen = document.getElementById("flashScreen");
        var color;

        switch(status) {
            case "fail":
                color = "red";
                break;
            case "othercase":
                color = "yellow";
                break;
            case "success":
                color = "green";
                break;
            default:
                color = "green";
        }


        if(flashScreen) {
            flashScreen.style.backgroundColor = color;
            flashScreen.style.display = "block";

            setTimeout(function() {
                flashScreen.style.display = "none";
            }, 200);
        }
    };

    FPS.start = function() {
        this.props.startTime = window.performance.now();
        this.props.isCollecting = true;

        //This is a series of 3 parallel events running to track frames, collect data, and countdown collect time
        _initRAF();
        this.initCollecting();
        this.startCountdown()
    };

    // Initializes the data collection interval.
    // This will run until the duration expires in startCountdown()
    FPS.initCollecting = function() {
        var self = this;

        var recordFrames = setInterval(function() {
            if(self.props.isCollecting) {
                self.props.collectedFPS.push(self.calcFPS());
            } else {
                clearInterval(recordFrames);
                self.stop();
            }
        }, self.props.collectionRate);
    };

    // Starts the countdown based FPS.config.duration
    FPS.startCountdown = function() {
        var self = this;

        setTimeout(function() {
            self.props.isCollecting = false;
        }, self.config.duration);
    };

    FPS.calcFPS = function() {
        var seconds = (window.performance.now() - this.props.startTime) / 1000;
        return Math.round((this.props.frames / seconds) * 100) / 100;
    };

    FPS.stop = function() {
        this.props.endTime = window.performance.now();
        this.flashScreen("success");
        var fpsInfo = this.prepData();

        if(fpsInfo.avg && fpsInfo.records.length > 0) {
            if(this.config.save && typeof this.config.save === "function") {
                this.config.save(fpsInfo);
            } else {
                this.save(fpsInfo);
            }
        } else {
            console.error('No benchmark data collected', fpsInfo);
        }
    };

    FPS.prepData = function() {
        var self = this;

        return {
             userAgent: _getUserAgent(),
             avg: _averageArray(self.props.collectedFPS),
             records: self.props.collectedFPS,
             timeStamp: Date.now()
         };
    };

    // This is just the default output of results to be used if a save function was not passed into the app
    FPS.save = function(fpsInfo) {
        console.log(fpsInfo);
    };

    // Initializes a recursive request on the request animation frame
    // This will run until the duration expires in startCountdown()
    function _initRAF() {
        FPS.props.frames++;

        if (FPS.props.isCollecting) {
            window.requestAnimationFrame(_initRAF);
        }
    }

    function _getUserAgent() {
        var userAgent = "";
        var uaString = navigator.userAgent;

        var i = uaString.indexOf("(");
        var j = uaString.indexOf(")");

        userAgent = uaString.substring(i + 1, j);
        userAgent = userAgent.replace(/;/g, "");

        return userAgent;
    }

    function _averageArray(array) {
        var average;

        var totalRecords = array.length;
        var sum = array.reduce(function(total, num){ return total + num }, 0);
        average = Math.round((sum / totalRecords) * 100) / 100;

        return average;
    }

    //Public interface
    window.fps = {
        init: function(configObj) {
            FPS.init(configObj);
        }
    };
}());
