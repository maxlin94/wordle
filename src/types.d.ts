type WordleStoreType = {
    guesses: Array<any>,
    currentGuess: number,
    wordLength: number,
    currentWordLength: number,
    correctLetters: Array<string>,
    misplacedLetters: Array<string>,
    usedLetters: Array<string>,
    init: () => void,
    submitGuess: (guess: string) => void,
    handleKeydown: (key: string) => void,
    setWordLength: (length: number) => void
}

type Guess = {
    letter: string,
    result: string
}