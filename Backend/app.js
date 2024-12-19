const express = require('express');
const cors = require('cors');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRouter');
const healthRouter = require('./routes/healthRoute');
const jobRouter = require('./routes/jobRoute');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the Job Listing api 🚀'
  });
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/health', healthRouter);

app.all('*', (req, res, next) => {
  next(new AppError('Route not found', 404));
});

app.use(globalErrorHandler);

module.exports = app;
