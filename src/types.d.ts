type WordleStoreType = {
    guesses: Array<Array<GuessType>>,
    currentGuess: number,
    wordLength: number,
    currentWordLength: number,
    allowDuplicates: boolean,
    correctLetters: Array<string>,
    misplacedLetters: Array<string>,
    usedLetters: Array<string>,
    init: () => void,
    submitGuess: (guess: string) => void,
    handleKeydown: (key: string) => void,
    setWordLength: (length: number) => void
}

type GuessType = {
    letter: string,
    result: string
}