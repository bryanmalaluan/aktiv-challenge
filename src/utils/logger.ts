class Logger {
  debug(name: string | null, message: any) {
    if (__DEV__) {
      if (name) {
        return console.log(`[${name}]:`, message);
      }
      console.log(message);
    }
  }

  info(name: string | null, message: any) {
    if (__DEV__) {
      if (name) {
        return console.info(`[${name}]:`, message);
      }
      console.info(message);
    }
  }

  warn(name: string | null, message: any) {
    if (__DEV__) {
      if (name) {
        return console.warn(`[${name}]:`, message);
      }
      console.warn(message);
    }
  }

  error(name: string | null, message: any) {
    if (__DEV__) {
      if (name) {
        return console.error(`[${name}]:`, message);
      }
      console.error(message);
    }
  }
}

const logger = new Logger();
export default logger;
