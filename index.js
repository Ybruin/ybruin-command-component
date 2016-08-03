// var debug = require('debug')('scrat:init'),
var colors = require('colors'),
    yeoman = require('yeoman-generator'),
    path = require('path'),
    localPath = path.join(__dirname, 'node_modules');
// prepend ./node_modules to NODE_PATH
process.env.NODE_PATH = process.env.NODE_PATH ?
    localPath + ':' + process.env.NODE_PATH : localPath;
function log(type, msg, color) {
    color = color || 'grey';
    var pad = Array(Math.max(0, 10 - type.length) + 1).join(' '),
        m = type === 'error' ? type : 'log';
    console[m]((pad + type).green, msg[color]);
}

exports.name = 'component';
exports.usage = '[options]'
exports.desc = 'init ybruin component project';
exports.register = function (commander) {
    commander
        .option('--skip-install', 'skip installation')
        .action(function () {
            var env = yeoman(),
                args = Array.prototype.slice.call(arguments),
                options = args.pop(),
                opts = {
                    clean: true,
                    skipInstall: !!options.skipInstall
                };
            env.lookup();

            env.on('error', function (err) {
                if (~err.message.indexOf('You don\'t seem to have a generator with the name')) {
                    err.message = err.message.split('\n')[0];
                }

                log('error', err.message, 'red');
                process.exit(err.code || 1);
            });
            env.on('end', function () {
                log('init', 'finished');
            });

            env.run('ybruin-component', opts);
        });
};