"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMockConsole = exports.YandexCloudSimpleLogger = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const format = require('quick-format-unescaped'); // same formater as the one is used in pino.js
const DEFAULT_ENV_KEY = 'LOG_LEVEL';
const DEFAULT_LEVEL = 'info';
const silentLogFn = () => { };
const yandexCloudLogFnBuilder = (level) => {
    const LEVEL = level.toUpperCase();
    return function log(objOrMsg, ...args) {
        const prefix = [];
        // if (this.showTimestamp) {
        //     prefix.push(new Date().toISOString());
        // }
        //
        // if (this.showLevel) {
        //     prefix.push(LEVEL);
        // }
        if (this.prefix) {
            prefix.push(this.prefix);
        }
        const prefixStr = prefix.length === 0 ? '' : `[${prefix.join(' ')}] `;
        if (typeof objOrMsg === 'object') {
            // TODO: Later add from pino
            // if (msg === null && n.length === 0) {
            //     formatParams = [null]
            // } else {
            //     msg = n.shift()
            //     formatParams = n
            // }
            if (typeof args[0] === 'string') {
                consoleOrMock.log(JSON.stringify({
                    ...(objOrMsg instanceof Error
                        ? { stack: objOrMsg.stack }
                        : objOrMsg),
                    level: LEVEL,
                    msg: format(`${prefixStr}${args[0]}`, args.splice(1)),
                }));
            }
            else {
                consoleOrMock.log(JSON.stringify({
                    ...(objOrMsg instanceof Error
                        ? { stack: objOrMsg.stack }
                        : objOrMsg),
                    level: LEVEL,
                    msg: format(`${prefixStr}%o`, objOrMsg instanceof Error
                        ? objOrMsg.message
                        : objOrMsg),
                }));
            }
        }
        else {
            consoleOrMock.log(JSON.stringify({
                level: LEVEL,
                msg: format(`${prefixStr}${objOrMsg}`, args),
            }));
        }
    };
};
/**
 * The simplest logger class, with a minimal set of logging methods and the most simple output to the Yandex Cloud logger.
 */
class YandexCloudSimpleLogger {
    constructor(options = {}) {
        this.fatal = silentLogFn;
        this.error = silentLogFn;
        this.warn = silentLogFn;
        this.info = silentLogFn;
        this.debug = silentLogFn;
        this.trace = silentLogFn;
        let { level, 
        // eslint-disable-next-line prefer-const
        prefix, 
        // eslint-disable-next-line prefer-const
        showTimestamp, 
        // eslint-disable-next-line prefer-const
        showLevel, } = options;
        if (prefix)
            this.prefix = prefix;
        this.showTimestamp = showTimestamp ?? false;
        this.showLevel = showLevel ?? false;
        // eslint-disable-next-line no-param-reassign
        const envKey = options.envKey ?? DEFAULT_ENV_KEY;
        const envLevel = process.env[envKey];
        level =
            envLevel !== undefined
                ? Object.entries(YandexCloudSimpleLogger.LogLevel).find((v) => v[0] === envLevel)?.[1]
                : level ?? YandexCloudSimpleLogger.LogLevel[DEFAULT_LEVEL];
        for (const lvl of Object.values(YandexCloudSimpleLogger.LogLevel)) {
            this[lvl] = yandexCloudLogFnBuilder(lvl);
            if (lvl === level)
                break;
        }
    }
}
exports.YandexCloudSimpleLogger = YandexCloudSimpleLogger;
// eslint-disable-next-line @typescript-eslint/no-namespace
(function (YandexCloudSimpleLogger) {
    let LogLevel;
    (function (LogLevel) {
        LogLevel["error"] = "error";
        LogLevel["warn"] = "warn";
        LogLevel["info"] = "info";
        LogLevel["debug"] = "debug";
        LogLevel["trace"] = "trace";
    })(LogLevel = YandexCloudSimpleLogger.LogLevel || (YandexCloudSimpleLogger.LogLevel = {}));
})(YandexCloudSimpleLogger || (exports.YandexCloudSimpleLogger = YandexCloudSimpleLogger = {}));
/**
 * For unit tests purposes.
 */
let consoleOrMock = console;
/**
 * **Only for unit tests purposes**.
 */
const setMockConsole = (mockConsole = console) => {
    consoleOrMock = mockConsole;
};
exports.setMockConsole = setMockConsole;
//# sourceMappingURL=index.js.map