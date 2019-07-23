const chalk = require('chalk');
const fs = require('fs');
const Config = require('./config');
const { ASCIILOGO } = require('./consts');

module.exports = {
    logLabel: {
        log: 'Logging:',
        welcome: 'Welcome:',
        warn: 'Warning:',
        error: 'Error',
    },

    logType: {
        log: 'log',
        welcome: 'welcome',
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
    },

    cwelcome() {
        const version = JSON.parse(fs.readFileSync(`${Config.installationPath()}/package.json`, 'UTF-8')).version;
        console.group(this.logStyle[this.logType.log](this.logLabel[this.logType.welcome]))
        console.log(ASCIILOGO(version));
        console.groupEnd();
    }

}

