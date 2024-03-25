import { Request, Response } from 'express';
import words from './data/words.ts';
import { getRandomWord } from './utils.ts';

export function startSession(req: Request, _: Response, next: () => void) {
    const length = req.params.length;
    const allowDuplicates = req.query.duplicates === 'true';
    const wordArr = words[parseInt(length)];
    const word = getRandomWord(wordArr, allowDuplicates);
    req.session.guesses = [];
    req.session.word = word;
    req.session.wordArr = wordArr;
    req.session.startTime = Date.now();
    req.session.numGuesses = 0;
    req.session.hasWon = false;
    req.session.hasLost = false;
    console.log(word)
    next()
}

export function validateGuess(req: Request, res: Response, next: () => void) {
    if (req.session.numGuesses && req.session.numGuesses >= 6) {
        return res.status(403).json({ message: 'Too many guesses' });
    }
    if (!req.session.word) {
        return res.status(400).json({ message: 'No word selected' });
    }
    const guess = req.query.word?.toString();
    if (!guess) {
        return res.status(400).json({ message: 'No guess provided' });
    }
    if (req.session.guesses && req.session.guesses.indexOf(guess) !== -1) {
        return res.status(400).json({ message: 'Word already guessed' });
    }
    if (req.session.wordArr && req.session.wordArr.indexOf(guess) === -1) {
        return res.status(400).json({ message: 'Word not in dictionary' });
    }
    next();
}

export function validateInput(req: Request, res: Response, next: () => void) {
    const length = parseInt(req.params.length);
    if(isNaN(length) || length < 4 || length > 8) return res.status(400).json({ message: 'Invalid length. Length must be between 4 and 8' });
    next()
}