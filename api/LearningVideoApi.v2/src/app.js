const createError = require('http-errors');
const path = require('path');
const cors = require('cors')
const storageRoute = require('./routes/storageRoute');
const pingRoute = require('./routes/pingRoute');
const videoRoute = require('./routes/videoRoute');
const userRoute = require('./routes/userRoute');
const bodyParser = require('body-parser');
const app = require('express')();
const { logRequest, logError } = require('./middlewares/loggingMiddleware')
const _ = require('lodash');
const { syncDb } = require('./db');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(logRequest)
app.use('/api/ping', pingRoute);;
app.use('/api/storage', storageRoute);
app.use('/api/video', videoRoute);
app.use('/api/user', userRoute);

app.use(logError)

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

const server = require('http').createServer(app);

module.exports = {
  server,
  syncDb
  // configureMongoDb,
  // configureRedisDb
}
