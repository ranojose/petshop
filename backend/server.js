const app = require('./app');

const connectDatabase = require('./config/database')
//const dotenv = require('dotenv');

//handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`); 
    console.log('Shutting down  server due to uncaught exception');
    process.exit(1)
})

//settingup config file
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })


 

//connecting to connectDatabase
connectDatabase();

 const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port: ${process.env.PORT} in  ${process.env.NODE_ENV} mode.`)
})

//handle Undhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})

