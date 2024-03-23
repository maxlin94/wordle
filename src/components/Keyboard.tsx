import { observer } from "mobx-react-lite";

const Keyboard = observer(({ store }: { store: WordleStoreType }) => {
    const alphabet = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']
    return (
        <div>
            {alphabet.map((row, i) => {
                return (
                    <div key={i} className="flex justify-center">
                        {row.split('').map((letter, j) => {
                            const bgColor = 
                            {...store}.correctLetters.includes(letter) ? 'bg-green-500' : 
                            {...store}.misplacedLetters.includes(letter) ? 'bg-yellow-500' : 
                            {...store}.usedLetters.includes(letter) ? 'bg-gray-600' : 'bg-gray-200';
                            return (
                                <>
                                    { i === 2 && j === 0 && <div key="enter" onClick={() => store.handleKeydown('Enter')} className={`m-1 p-4 bg-gray-200 rounded-sm font-bold cursor-pointer`}>ENTER</div> }
                                    <div key={j} onClick={() => store.handleKeydown(letter)} className={`m-1 p-4 ${bgColor} rounded-sm font-bold cursor-pointer`}>{letter.toUpperCase()}</div>
                                    { i === 2 && j === row.length - 1 && <div key="backspace" onClick={() => store.handleKeydown('Backspace')} className={`m-1 p-4 bg-gray-200 rounded-sm font-bold cursor-pointer`}>DEL</div> }
                                </>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
})

export default Keyboard;