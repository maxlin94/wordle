const WordleStore: WordleStoreType = {
    guesses: [],
    maxGuesses: 6,
    currentGuessIndex: 0,
    wordLength: 5,
    currentWordLength: 0,
    allowDuplicates: false,
    correctLetters: [],
    misplacedLetters: [],
    usedLetters: [],
    hasWon: false,
    hasLost: false,
    forceNewWord: false,
    init: async function () {
        this.guesses = Array(this.maxGuesses).fill(Array(this.wordLength).fill({ letter: '', result: '' }));
        await this.fetchWord();
        this.resetGame();
        await this.fetchGuesses();
    },
    submitGuess: async function (guess: string) {
        const result = await fetch(`/api/words/guess?word=${guess}`, { method: 'POST' });
        const data = await result.json();
        if (data.message !== 'Success') return
        data.result.forEach((guess: GuessType) => {
            if (guess.result === 'correct' && !this.correctLetters.includes(guess.letter)) {
                this.correctLetters.push(guess.letter)
            }
            else if (guess.result === 'misplaced' && !this.misplacedLetters.includes(guess.letter)) {
                this.misplacedLetters.push(guess.letter)
            }
            else {
                this.usedLetters.push(guess.letter)
            }
        })
        this.guesses[this.currentGuessIndex] = data.result;
        this.hasWon = data.hasWon;
        this.hasLost = data.hasLost;
        this.currentGuessIndex++;
        this.currentWordLength = 0;
    },
    handleKeydown: function (key: string) {
        if (this.currentGuessIndex >= this.maxGuesses || this.hasWon || this.hasLost) return;
        else if (key === 'Backspace' && this.currentWordLength > 0) {
            this.currentWordLength--;
            this.guesses[this.currentGuessIndex][this.currentWordLength].letter = '';
        }
        else if (key === 'Enter' && this.currentWordLength === this.wordLength) {
            const guess = this.guesses[this.currentGuessIndex].map((obj: GuessType) => obj.letter).join('');
            this.submitGuess(guess);
        }
        else if (key.length === 1 && key.match(/[a-z]/i) && this.currentWordLength < this.wordLength) {
            this.guesses[this.currentGuessIndex][this.currentWordLength].letter = key;
            this.currentWordLength++;
        }
    },
    setWordLength: function (length: number) {
        this.wordLength = length;
    },
    setForceNewWord: function (value: boolean) {
        this.forceNewWord = value;
    },
    resetGame: function () {
        this.currentGuessIndex = 0;
        this.currentWordLength = 0;
        this.correctLetters = [];
        this.misplacedLetters = [];
        this.usedLetters = [];
        this.hasWon = false;
        this.hasLost = false;
    },
    fetchGuesses: async function () {
        const result = await fetch(`/api/result/guesses`)
        const data = await result.json();
        if(data.guesses.length === 0) return
        data.guesses.forEach((guess: GuessType[], index: number) => {
            this.guesses[index] = guess;
        })
        this.currentGuessIndex = data.currentGuessIndex;
    },
    fetchWord: async function() {
        const data = await fetch(`/api/words/random/${this.wordLength}?duplicates=${this.allowDuplicates}&forceNewWord=${this.forceNewWord}`);
        const { wordLength } = await data.json();
        this.setWordLength(wordLength);
    }
}

export default WordleStore