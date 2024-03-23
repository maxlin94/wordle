import { useState } from "react";
import { observer } from "mobx-react-lite";
import Guess from "./Guess";

export default observer(function GuessBox({ store }: { store: WordleStoreType }) {
    const [inputValue, setInputValue] = useState("5");
    return (
        <div className="mb-5">
            {Array(store.guesses.length).fill(0).map((_, i) => (
                <Guess key={i} store={store} guess={{...store}.guesses[i]}/>
            ))}
            <button onClick={() => {
                store.wordLength = parseInt(inputValue);
                store.init()
            }}>New word</button>
            <label htmlFor="word-length">Length: </label>
            <select name="word-length" id="word-length" value={inputValue} onChange={(e) => {
                setInputValue(e.target.value)
            }}>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
            </select>
        </div>
    )
})