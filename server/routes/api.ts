import express, { Router, Request, Response} from 'express';
import { getRandomWord, wordleCompare } from '../utils.ts';
import session from 'express-session';
import words from '../data/words.ts'

const apiRouter: Router = express.Router();

declare module "express-session" {
    interface SessionData {
        word: string,
        wordArr: Array<string>
    }
}

apiRouter.use(session({
    secret: "very-secret",
    resave: false,
    saveUninitialized: false,
  }));

apiRouter.get('/words/random/:length', (req: Request, res: Response) => {
    const length = req.params.length;
    const wordArr = words[parseInt(length)];
    if(!wordArr) return res.json({ message: 'Invalid length' });
    const allowDuplicates = req.query.duplicates === 'true';
    const word = getRandomWord(wordArr, allowDuplicates);
    req.session.word = word;
    req.session.wordArr = wordArr;
    res.json({ wordLength: word.length });
});

apiRouter.get('/words/guess', (req: Request, res: Response) => {
    if(!req.session.word) return res.json({ message: 'No word selected' });
    const guess = req.query.word?.toString();
    if(!guess) return res.json({ message: 'No guess provided' });
    if(req.session.wordArr && req.session.wordArr.indexOf(guess) === -1) return res.json({ message: 'Word not in dictionary' });
    const result = wordleCompare(guess, req.session.word);
    res.json({ message: 'Success', result });
});

export default apiRouter;
