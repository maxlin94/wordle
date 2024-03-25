import { observer } from "mobx-react-lite";

type GuessProps = {
    guesses: Array<Array<GuessType>>,
    wordLength: number,
    index: number
}
const Guess = observer(({ guesses, wordLength, index }: GuessProps) => {
    return (
        <div className="flex animate-scale">
            {Array(wordLength).fill(0).map((_, i) => {
                const guess = guesses[index][i];
                const result = guess.result;
                const bgColor = result === 'correct' ? 'bg-green-500' : result === 'misplaced' ? 'bg-yellow-400' : result === 'incorrect' ? 'bg-gray-500' : 'bg-gray-400';
                return <div key={i} className={`flex justify-center items-center h-12 w-12 m-1 text-2xl font-bold rounded-sm ${bgColor}`}>{guess.letter.toUpperCase()}</div>
            })}
        </div>
    )
})

export default Guess;