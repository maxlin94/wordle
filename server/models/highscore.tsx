import { Schema } from 'mongoose';
import mongoose from 'mongoose';

type HighscoreType = {
    name: string,
    time: number,
    guesses: string[],
    wordLength: number,
    allowDuplicates: boolean,
}

const highscoreSchema = new Schema({
    name: { type: String, required: true },
    time: { type: Number, required: true },
    guesses: { type: [String], required: true },
    wordLength: { type: Number, required: true },
    allowDuplicates: { type: Boolean, required: true },
}, { versionKey: false });

const Highscore = mongoose.model<HighscoreType>('Highscore', highscoreSchema);

export { Highscore };