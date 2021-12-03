const chalk = require('chalk');
const log = {
    log: console.log,
    log_error: msg => console.log(chalk.red(msg)),
    error: function() {
        arguments[0] = chalk.red('➜') + '  ' + arguments[0];
        console.log.apply(null, arguments)
    },

    info: function() {
        arguments[0] = chalk.green('➜') + '  ' + arguments[0];
        console.log.apply(null, arguments)
    } 
};

module.exports = log;