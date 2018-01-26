const express    = require('express'),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      morgan     = require('morgan'),
      config     = require('config'),
      app        = express();

// API Services
const serviceGet    = require('./services/get'),
      servicePost   = require('./services/post'),
      serviceUpdate = require('./services/update'),
      serviceDelete = require('./services/delete');

// Export Files
const exportDB = require('./utilities/export');

/* *** *** IMPORTS *** *** */


const API_CONFIG = config.api;

// set our port
const PORT = process.env.PORT || API_CONFIG.port;

// create our router
const router = express.Router();

// Handle the connection event
const db = mongoose.connection;
// DATABASE SETUP
const HOST = `${config.db.host}${config.db.port}`;
mongoose.connect(HOST);

// Mangoose Event Emitter
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('DB Connected'));


// CLI Options
if(process.argv[2] == 'export')
  return exportDB(process.argv[3]);

// configure app
// log requests to the console
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware to use for all requests
router.use((req, res, next) => {
  // do loggin
  console.log('API called');
  next()
});

console.log(serviceGet.init);
// API Routes
router.get('/', serviceGet.init);

router.route('/task/:id')
  .get(serviceGet.getTask)
  .put(serviceUpdate.updateTask)
  .delete(serviceDelete.deleteTask);

router.route('/tasks')
  .post(servicePost)
  .get(serviceGet.getTasks)

app.use(`${API_CONFIG.path}${API_CONFIG.version}`, router);

// START server
app.listen(PORT);

console.log(`running on: ${API_CONFIG.host}:${PORT}`);
