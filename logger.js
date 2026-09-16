const fs = require ('fs');
const os = require ('os');

const EventEmitter = require ('events');

class Logger extends EventEmitter {      //means: Create our own Logger class that inherits the functionality of EventEmitter.

    log (message) {
        this.emit ('message', {message});    //means: Emit an event called 'message' with the message as data.
    }
}

const logger = new Logger();       // means: Create an instance of the logger class.

const logFile = `./eventlog.txt`;     //means: Define the path to the log file where the events will be logged. So eventually our program will create something like: eventlog.txt file in the root directory of our project.


//This is our actual listener function. The function that writes logs
const logToFile = (event) => {  
    const logMessage = `${new Date().toISOString()} - ${event.message} \n`;

    fs.appendFileSync(logFile, logMessage);   //means: Append logMessage to eventlog.txt (the log file). If the file does not exist, it will be created. The 'Sync' version of the function is used here for simplicity, but in a real-world application, you might want to use the asynchronous version to avoid blocking the event loop. Append doesn't erase previous logs.
}


logger.on ('message', logToFile)     //means: Register the logToFile function as a listener for the 'message' event. Whenever the 'message' event is emitted, the logToFile function will be called with the event data.

setInterval(() => {
    const memoryUsage = (os.freemem() / os.totalmem()) * 100     //means: Calculate the percentage of free memory available on the system. os.freemem() returns the amount of free system memory in bytes, and os.totalmem() returns the total amount of system memory in bytes. The result is multiplied by 100 to convert it to a percentage.

    logger.log(`Current memory usage: ${memoryUsage.toFixed(2)}`)   //means: Log the current memory usage by emitting a 'message' event with the memory usage information. The toFixed(2) method is used to format the memory usage to two decimal places.

},3000)


logger.log('Application started')
logger.log('Application event occured')