import express, { Router, Request, Response } from 'express';
import { wordleCompare, updateGameState } from '../utils.ts';
import { validateWordLength, startSession, validateGuess, validateHighscore } from '../middleware.ts';
import { Highscore } from "../models/highscore.tsx";

const apiRouter: Router = express.Router();

declare module "express-session" {
    interface SessionData {
        word: string,
        wordList: Array<string>,
        hasWon: boolean,
        hasLost: boolean,
        startTime: number,
        endTime: number | null,
        guesses: Array<string>,
        allowDuplicates: boolean
    }
}

apiRouter.post('/highscore', validateHighscore, async (req: Request, res: Response) => {
    const { name } = req.body;
    const { guesses, allowDuplicates } = req.session;
    const time = (((req.session.endTime || 0) - (req.session.startTime || 0)) / 1000).toFixed(2);
    await Highscore.create({guesses, name, time, wordLength: req.session.word?.length, allowDuplicates});
    res.json({ message: 'Success' });
});

apiRouter.get('/words/random/:length', validateWordLength, startSession, (req: Request, res: Response) => {
    if (!req.session.word) return res.status(500).json({ message: 'Error selecting word' });
    res.json({ message: 'Random word chosen', wordLength: req.session.word.length });
});

apiRouter.get('/words/guess', validateGuess, (req: Request, res: Response) => {
    const guess = req.query.word?.toString();
    if (!guess || !req.session.word) return res.json({ message: 'Invalid guess' });
    req.session.guesses?.push(guess)
    const result = wordleCompare(guess, req.session.word);
    updateGameState(guess, req);
    return res.json({ message: 'Success', result, hasWon: req.session.hasWon, hasLost: req.session.hasLost });
});

apiRouter.get('/result/guesses', (req: Request, res: Response) => {
    if (!req.session.guesses || !req.session.word) return res.json({ message: 'No guesses' });
    const guesses = [];
    for (const guess of req.session.guesses) {
        const result = wordleCompare(guess, req.session.word);
        guesses.push(result);
    }
    res.json({ guesses, currentGuessIndex: req.session.guesses?.length });
});

apiRouter.get('/result', (req: Request, res: Response) => {
    if (!req.session.endTime || !req.session.startTime || (!req.session.hasWon && !req.session.hasLost)) return res.status(403).json({ message: 'No game finished' });
    const timePassed = ((req.session.endTime - req.session.startTime) / 1000).toFixed(2);
    res.json({ timePassed, word: req.session.word });
});

export default apiRouter;