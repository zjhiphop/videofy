var videofy = require("./");
var http = require('http');
var fs = require('fs');
var exec = require("child_process").exec;

var opts = {
    rate: 10,
    codec: 'libx264'
};

console.time('convert');
videofy('tmp/test.gif', 'tmp/test-video.mp4', opts, function(err) {
    if (err) throw err;

    console.time('convert');
    var videoStat = fs.statSync('tmp/test-video.mp4');
    var gifStat = fs.statSync('tmp/test.gif');

    console.log('Gif Size: %s kb', gifStat.size / 1000 | 0);
    console.log('Video Size: %s kb', videoStat.size / 1000 | 0);

    exec('rm -f tmp/test-video.mp4');
})