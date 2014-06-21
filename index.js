/*
 * Module dependencies
 */

var exec = require("child_process").exec;
var escape = require("shell-escape");
var debug = require("debug")("videofy");
var mkdirp = require("mkdirp");
var uid = require("uid2");

/*
 *  Expose videofy
 */

module.exports = videofy;

/**
 * Convert `input` file to `output` video with the given `opts`:
 *
 *  - `rate` frame rate [10]
 * 	- `encoders` the video codec format, default is libx264
 *
 * @param {String} input
 * @param {String} output
 * @return
 * @api public
 */
function videofy(input, output, opts, fn) {
    if (!input) throw new Error('input filename required');
    if (!output) throw new Error('output filename required');

    var FORMAT = '-%05d';

    // options
    if ('function' == typeof opts) {
        fn = opts;
        opts = {};
    } else {
        opts = opts || {};
    }

    opts.rate = opts.rate || 10;
    opts.codec = opts.codec || 'libx264';

    // tmpfile(s)
    var id = uid(10);
    var dir = 'tmp/' + id;
    var tmp = dir + '/tmp' + FORMAT + '.jpg';


    function gc(err) {
        debug('remove %s', dir);
        exec('rm -fr ' + dir);
        fn(err);
    }

    debug('mkdirp -p %s', dir);

    mkdirp(dir, function(error) {
        if (error) return fn(error);

        // convert gif to tmp jpg
        var cmd = ['convert', input, tmp];
        cmd = escape(cmd);

        debug('exec %s', cmd);
        // covert jpg collection to video
        exec(cmd, function(err) {

            if (err) return gc(err);

            var cmd = ['ffmpeg'];

            cmd.push('-f', 'image2');
            cmd.push('-r', String(opts.rate));
            cmd.push('-i', tmp);
            cmd.push('-c:v', String(opts.codec));
            cmd.push(output);

            cmd = escape(cmd);

            debug("exec %s", cmd);

            exec(cmd, gc);
        });

    });


}