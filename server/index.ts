import express, { Express, Request, Response} from 'express';
import apiRouter from './routes/api';
import session from 'express-session';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 5080;
const connectionOptions: mongoose.ConnectOptions = {
  dbName: process.env.DB_NAME,
}
mongoose.connect(process.env.DB_CONN_STRING || '', connectionOptions)

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'very-secret',
  resave: false,
  saveUninitialized: false,
}));
app.use('/api', apiRouter);

app.use(express.static('dist'));

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});