import { observer } from "mobx-react-lite";
import Guess from "./Guess";

export default observer(function GuessBox({ store }: { store: WordleStoreType }) {
    return (
        <div className="mb-5">
            {Array(store.guesses.length).fill(0).map((_, i) => (
                <Guess key={i} store={store} guess={{...store}.guesses[i]}/>
            ))}
        </div>
    )
})