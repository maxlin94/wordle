import { Schema } from 'mongoose';

const highscoreSchema = new Schema({
    name: String,
    time: Number,
    guesses: Array,
    wordLength: Number,
    allowDuplicates: Boolean,
}, { collection: process.env.DB_COLLECTION_NAME, versionKey: false });

export { highscoreSchema };