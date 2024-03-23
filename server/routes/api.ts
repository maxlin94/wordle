import express, { Router, Request, Response} from 'express';
import session from 'express-session';
import words from '../data/words.ts'

const apiRouter: Router = express.Router();

declare module "express-session" {
    interface SessionData {
        word: string,
        wordArr: Array<string>
    }
}

function wordleCompare(guessWord: any, correctWord: string) {
    if(!guessWord || !correctWord || (guessWord.length !== correctWord.length)) return [];
    const GUESS = guessWord.toLowerCase().split('');
    const CORRECT = correctWord.toLowerCase().split('');
    const RESULT = GUESS.map((letter: string, index: number) => {
        const isCorrect = GUESS[index] === CORRECT[index];
        isCorrect ? CORRECT[index] = '' : null;
        return { 
            letter, 
            result: isCorrect ? 'correct' : 'incorrect'
        }
    });
    GUESS.forEach((letter: string, index: number) => {
        if(CORRECT.includes(letter) && RESULT[index].result === 'incorrect') {
            RESULT[index].result = 'misplaced';
            CORRECT[CORRECT.indexOf(letter)] = '';
        }
    })
    return RESULT;
}

apiRouter.use(session({
    secret: "very-secret",
    resave: false,
    saveUninitialized: false,
  }));

apiRouter.get('/words/random/:length?', (req: Request, res: Response) => {
    const length = req.params.length;
    const wordArr = words[parseInt(length)];
    if(!wordArr) return res.json({ message: 'Invalid length' });
    const word = wordArr[Math.floor(Math.random() * wordArr.length)];
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
