import { useState } from "react";
import { observer } from "mobx-react-lite";

const Settings = observer(({ store }: {store: WordleStoreType}) => {
    const [wordLength, setWordLength] = useState(store.wordLength);
    const [open, setOpen] = useState(false);
    const rounded = open ? 'rounded-t-md' : 'rounded-md';

    const handleSetWordLength = (e: HTMLSelectElement) => {
        setWordLength(parseInt(e.value))
    };
    const handleSetOpen = () => {
        setOpen(!open)
    };
    return (
        <div className="absolute right-[-105px] top-0 mt-1">
            <button className={`text-white text-lg font-semibold bg-gray-600 py-2 px-4 ${rounded} hover:text-opacity-75`} onClick={handleSetOpen}>Settings</button>
            <div className="relative">
                {open &&
                    <div className="flex flex-col absolute gap-5 p-5 w-52 bg-gray-600 rounded-b-md rounded-tr-md">
                        <div className="flex">
                            <label className="text-white text-lg mr-2" htmlFor="word-length">Length: </label>
                            <select name="word-length" id="word-length" value={wordLength} onChange={(e) => {
                                handleSetWordLength(e.target)
                            }}>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-white text-lg mr-2" htmlFor="allow-duplicates">Duplicate letters: </label>
                            <input
                                type="checkbox"
                                name="allow-duplicates"
                                id="allow-duplicates"
                                checked={store.allowDuplicates}
                                onChange={() => { store.allowDuplicates = !store.allowDuplicates; }} />
                        </div>
                        <button className="text-black text-lg bg-gray-200 font-bold rounded-md" onClick={() => {
                            store.setForceNewWord(true);
                            store.setWordLength(wordLength);
                            store.init()
                        }}>New word</button>
                    </div>
                }
            </div>
        </div>
    )
})

export default Settings;