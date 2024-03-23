export function getRandomWord(array: Array<string>, allowDuplicates: boolean) {
    if(allowDuplicates) return array[Math.floor(Math.random() * array.length)];
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomWord = array[randomIndex];
    const set = new Set(randomWord.split(''));
    if(set.size === randomWord.length) return randomWord;
    return getRandomWord(array, allowDuplicates);
}

export function wordleCompare(guessWord: any, correctWord: string) {
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