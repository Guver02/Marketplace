const config = require('./configuration/config')
const express = require('express')
const app = express()
const port = config.port
const routerApi = require('./routes/index')
const path = require('path')
const bodyParser = require ('body-parser')
//const SocketIO = require('socket.io')
const midd = require('./middlewares/middleware.handler')
const http = require('http')
const cors = require('cors');
const server =  http.createServer(app)
const cokieParser = require('cookie-parser')


var corsOptions = {
    credentials: true,
  origin: 'http://localhost:3200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//middleaware not errors
app.use(cors(corsOptions ));
//require('./utils/auth/index')
//const mainTask = require('./utils/tasks/notifications')
//mainTask.start()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(cokieParser())
//middleware routes
routerApi(app)

//middleware errors
app.use(midd.logErrors)
app.use(midd.boomErrorHandler)
app.use(midd.errorHandler)


server.listen(port,()=>{
  console.log("conected in host:" + port + "/");
})
