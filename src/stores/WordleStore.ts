const WordleStore: WordleStoreType = {
    guesses: [],
    maxGuesses: 6,
    currentGuessIndex: 0,
    wordLength: Math.floor(Math.random() * (8 - 4 + 1) + 4),
    currentWordLength: 0,
    allowDuplicates: false,
    correctLetters: [],
    misplacedLetters: [],
    usedLetters: [],
    hasWon: false,
    hasLost: false,
    init: async function () {
        this.guesses = Array(this.maxGuesses).fill(Array(this.wordLength).fill({ letter: '', result: '' }));
        const data = await fetch(`/api/words/random/${this.wordLength}?duplicates=${this.allowDuplicates}`);
        const { wordLength } = await data.json();
        this.setWordLength(wordLength);
        this.resetGame();
    },
    submitGuess: async function (guess: string) {
        const data = await fetch(`/api/words/guess?word=${guess}`).then(res => res.json()).then(data => data);
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
    resetGame: function () {
        this.currentGuessIndex = 0;
        this.currentWordLength = 0;
        this.correctLetters = [];
        this.misplacedLetters = [];
        this.usedLetters = [];
        this.hasWon = false;
        this.hasLost = false;
    }
}

export default WordleStore