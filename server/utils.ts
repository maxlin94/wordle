export function getRandomWord(array: Array<string>, allowDuplicates: boolean, maxTries = 1000): string {
    if(!array || maxTries <= 0) return '';
    const randomIndex = Math.floor(Math.random() * array.length);
    if(allowDuplicates) return array[randomIndex];
    const randomWord = array[randomIndex];
    const set = new Set(randomWord.split(''));
    if(set.size === randomWord.length) return randomWord;
    return getRandomWord(array, allowDuplicates, maxTries - 1);
}

export function wordleCompare(guessWord: string, correctWord: string): Array<GuessType> {
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