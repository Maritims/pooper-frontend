export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3
}

export type LoggerConfiguration = {
    context: string
    level: LogLevel
};

export class Logger {
    configuration: LoggerConfiguration;

    constructor(configuration: LoggerConfiguration) {
        this.configuration = configuration;
    }

    log(message: string, level: LogLevel): void {
        if(this.configuration.level > level) return;

        let color: string;
        switch(level) {
            case LogLevel.DEBUG: color = '#8A8A8A'; break;
            case LogLevel.WARN: color = '#FFFF8A'; break;
            case LogLevel.ERROR: color = '#FF8A8A'; break;
            case LogLevel.INFO:
            default: color = '#FFF'; break;
        }

        console.log(
            `%c${LogLevel[level]} | ${new Date().toISOString()} | ${this.configuration.context}: ${message}`,
            `padding: 5px; font-size: 16px; background: #000; font-weight: bold; color: ${color};`
        );
    }

    debug(message: string): void {
        this.log(message, LogLevel.DEBUG);
    }

    info(message: string): void {
        this.log(message, LogLevel.INFO);
    }

    warn(message: string): void {
        this.log(message, LogLevel.WARN);
    }

    error(message: string): void {
        this.log(message, LogLevel.ERROR);
    }
}

export function getLogger(configuration: LoggerConfiguration): Logger {
    return new Logger(configuration);
}