import express, { Express, Request, Response} from 'express';
import apiRouter from './routes/api';
import session from 'express-session';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { highscoreSchema } from './schemas/highscore';

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
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use('/api', apiRouter);

app.use(express.static('dist'));

app.get('/highscore', async (_: Request, res: Response) => {
  const model = mongoose.model('highscore', highscoreSchema);
  const highscore = await model.find().sort({time: 1});
  res.render('highscore', { highscore });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});