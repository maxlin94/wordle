import { useState } from "react";
import { observer } from "mobx-react-lite";

export default observer(function Settings({ store }: { store: WordleStoreType }) {
    const [inputValue, setInputValue] = useState(store.wordLength);
    const [open, setOpen] = useState(false);
    const rounded = open ? 'rounded-t-md' : 'rounded-md';

    const handleSetInputValue = (e: HTMLSelectElement) => {
        setInputValue(parseInt(e.value))
    };
    const handleSetOpen = () => {
        setOpen(!open)
    };
    return (
        <div className="absolute right-[-105px] top-0">
        <button className={`text-white text-lg font-semibold bg-gray-600 py-2 px-4 mt-[-10px] ${rounded}`} onClick={handleSetOpen}>Settings</button>
        <div className="relative">
            {open &&
                <div className="flex flex-col absolute gap-5 p-5 w-40 bg-gray-600 rounded-b-md rounded-tr-md">
                    <div className="flex">
                        <label className="text-white text-lg mr-2" htmlFor="word-length">Length: </label>
                        <select name="word-length" id="word-length" value={inputValue} onChange={(e) => {
                            handleSetInputValue(e.target)
                        }}>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-white text-lg mr-2" htmlFor="allow-duplicates">Duplicates: </label>
                        <input
                            type="checkbox"
                            name="allow-duplicates"
                            id="allow-duplicates"
                            checked={store.allowDuplicates}
                            onChange={() => { store.allowDuplicates = !store.allowDuplicates; }} />
                    </div>
                    <button className="text-black text-lg bg-gray-200 font-bold rounded-md" onClick={() => {
                        store.wordLength = inputValue;
                        store.init()
                    }}>New word</button>
                </div>
            }
        </div>
    </div>
    )
})