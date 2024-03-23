import express, { Express, Request, Response} from 'express';
import apiRouter from './routes/api';

const app: Express = express();
const port = process.env.PORT || 5080;

app.use(express.json());
app.use('/api', apiRouter);

app.use(express.static('dist'));

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});