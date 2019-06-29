const chalk = require('chalk');

module.exports = {
    logLabel: {
        log: 'Logging:',
        warn: 'Warning:',
        error: 'Error',
    },

    logType: {
        log: 'log',
        warn: 'warn',
        error: 'error',
    },

    logStyle: {
        error: chalk.bold.bgRed.black,
        warn: chalk.bold.bgYellow.black,
        log: chalk.bold.bgGreen.black
    },

    clog(log, type = this.logType.log) {
        console.group(this.logStyle[type](this.logLabel[type]))
        if (Array.isArray(log)) {
            log.map(logging => {
                console.log(logging);
            });
        } else {
            console.log(log);
        }
        console.groupEnd();
    },

    cerror(log) {
        console.group(this.logStyle[this.logType.error](this.logLabel[this.logType.error]))
        if (Array.isArray(log)) {
            log.map(logging => {
                console.log(logging);
            });
        } else {
            console.log(log);
        }
        console.groupEnd();
    },

    cwarn(log) {
        console.group(this.logStyle[this.logType.warn](this.logLabel[this.logType.warn]))
        if (Array.isArray(log)) {
            log.map(logging => {
                console.log(logging);
            });
        } else {
            console.log(log);
        }
        console.groupEnd();
    }

}

