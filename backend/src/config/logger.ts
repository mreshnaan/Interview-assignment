import { createLogger, format, transports } from 'winston'
import dateFns from 'date-fns'
const { combine, timestamp, printf, colorize, errors } = format

const myFormat = printf(({ level, message, timestamp, stack }) => {
  return `${dateFns.format(new Date(timestamp as string), 'yyyy-MM-dd HH:mm:ss')} ${level}: ${stack || message}`
})

// Logger configuration
const logger = createLogger({
  level: 'info', // Minimum level to log
  format: combine(
    colorize(), // Colorize log levels
    timestamp(), // Add timestamp
    errors({ stack: true }), // Handle exceptions and show stack traces
    myFormat, // Use custom format
  ),
  transports: [
    // Console transport
    new transports.Console(),
  ],
})

export default logger

/*
import logger from './config/logger';
logger.info('Informational message');
logger.error('Error message');
  */
