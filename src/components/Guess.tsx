type Props = {
    guess: any,
    store: WordleStoreType
}

export default function Guess({ guess, store }: Props) {
    return (
        <div className="flex">
        {Array(store.wordLength).fill(0).map((_, i) => {
            const result = guess[i].result;
            const bgColor = result === 'correct' ? 'bg-green-500' : result === 'misplaced' ? 'bg-yellow-500' : result === 'incorrect' ? 'bg-gray-500' : 'bg-gray-400';
            return <div key={i} className={`flex justify-center items-center h-10 w-10 m-2 font-bold rounded-sm ${bgColor}`}>{guess[i]?.letter.toUpperCase()}</div>
        })}
        </div>
    )
} 