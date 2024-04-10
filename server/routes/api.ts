import express, { Router, Request, Response } from 'express';
import { wordleCompare } from '../utils.ts';
import { validateInput, startSession, validateGuess } from '../middleware.ts';
import { highscoreSchema } from "../schemas/highscore.tsx";
import mongoose from 'mongoose';

const apiRouter: Router = express.Router();

declare module "express-session" {
    interface SessionData {
        word: string,
        wordArr: Array<string>,
        numGuesses: number,
        hasWon: boolean,
        hasLost: boolean,
        startTime: number,
        endTime: number | null,
        guesses: Array<string>,
        allowDuplicates: boolean
    }
}

apiRouter.get('/highscore', async (_: Request, res: Response) => {
    const model = mongoose.model('highscore', highscoreSchema);
    const highscores = await model.find().sort({ time: 1 });
    res.json({ highscores });
});

apiRouter.post('/highscore', async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name || !req.session.hasWon || !req.session.endTime || !req.session.startTime) return res.status(400).json({ message: 'Invalid input' });
    const seconds = (req.session.endTime - req.session.startTime) / 1000;
    const model = mongoose.model('highscore', highscoreSchema);
    const newHighscore = new model({ name, time: seconds, guesses: req.session.guesses, wordLength: req.session.word?.length, allowDuplicates: req.session.allowDuplicates });
    await newHighscore.save();
    res.json({ message: 'Success' });
});

apiRouter.get('/words/random/:length', validateInput, startSession, (req: Request, res: Response) => {
    if (!req.session.word) return res.status(500).json({ message: 'Error selecting word' });
    res.json({ message: 'Random word chosen', wordLength: req.session.word.length });
});

apiRouter.post('/words/guess', validateGuess, (req: Request, res: Response) => {
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
    res.json({ guesses, currentGuessIndex: req.session.numGuesses });
});

apiRouter.get('/result', (req: Request, res: Response) => {
    if (!req.session.endTime || !req.session.startTime || (!req.session.hasWon && !req.session.hasLost)) return res.status(403).json({ message: 'No game finished' });
    const timePassed = (req.session.endTime - req.session.startTime) / 1000;
    res.json({ timePassed, word: req.session.word, numGuesses: req.session.numGuesses, hasWon: req.session.hasWon, hasLost: req.session.hasLost, guesses: req.session.guesses });
});

function updateGameState(guess: string, req: Request) {
    const correctGuess = guess === req.session.word;
    if (correctGuess) {
        req.session.hasWon = true;
        req.session.endTime = Date.now();
    }
    else if (!correctGuess && req.session.numGuesses === 5) {
        req.session.hasLost = true;
        req.session.endTime = Date.now();
    }
    req.session.numGuesses = (req.session.numGuesses || 0) + 1;
}

export default apiRouter;