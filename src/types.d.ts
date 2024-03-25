type WordleStoreType = {
    guesses: Array<Array<GuessType>>,
    maxGuesses: number,
    currentGuessIndex: number,
    wordLength: number,
    currentWordLength: number,
    allowDuplicates: boolean,
    correctLetters: Array<string>,
    misplacedLetters: Array<string>,
    usedLetters: Array<string>,
    hasWon: boolean,
    hasLost: boolean,
    init: () => void,
    submitGuess: (guess: string) => void,
    handleKeydown: (key: string) => void,
    setWordLength: (length: number) => void,
    resetGame: () => void
}

type GuessType = {
    letter: string,
    result: string
}