/**
 * The simplest logger class, with a minimal set of logging methods and the most simple output to the Yandex Cloud logger.
 */
export declare class YandexCloudSimpleLogger implements YandexCloudSimpleLogger.Logger {
    error: YandexCloudSimpleLogger.LogFn;
    warn: YandexCloudSimpleLogger.LogFn;
    info: YandexCloudSimpleLogger.LogFn;
    debug: YandexCloudSimpleLogger.LogFn;
    trace: YandexCloudSimpleLogger.LogFn;
    showTimestamp: boolean;
    showLevel: boolean;
    constructor(options?: {
        /**
         * Level down to which to log messages. Default is *info*.
         */
        level?: YandexCloudSimpleLogger.LogLevel;
        /**
         * Whether to add the date and time to the message. Default is false.
         */
        readonly showTimestamp?: boolean;
        /**
         * Whether to add the message level. Default is false
         */
        readonly showLevel?: boolean;
        /**
         * Environment variable with logging level, which if specified contains the level of
         * logging - *error*, *warn*, *info*, *debug*. If not specified, the value of level parameter
         * is used.  If a non-existing level value is specified, all levels are logged.
         */
        envKey?: string;
    });
}
export declare namespace YandexCloudSimpleLogger {
    interface LogFn {
        (obj: unknown, msg?: string, ...args: unknown[]): void;
        (msg: string, ...args: unknown[]): void;
    }
    /**
     * The simplest interface, containing only the necessary methods used in the project.
     * Therefore, *fatal* and *trace* methods are omitted.
     */
    interface Logger {
        error: LogFn;
        warn: LogFn;
        info: LogFn;
        debug: LogFn;
        trace: LogFn;
    }
    enum LogLevel {
        error = "error",
        warn = "warn",
        info = "info",
        debug = "debug",
        trace = "trace"
    }
}
/**
 * **Only for unit tests purposes**.
 */
export declare const setMockConsole: (mockConsole?: Console) => void;
