import { useState } from 'react';
import LoadingIndicator from './LoadingIndcator';

export default function SubmitHighscore() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    async function submit() {
        setLoading(true);
        await fetch('/api/highscore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name || 'Anonymous' })
        })
            .then((res) => {
                if(res.status === 200) {
                    setSuccess(true);
                    return res.json()
                }
                else {
                    throw new Error('Error submitting highscore');
                }
            })
            .catch((err) => {
                console.log(err)
                setError(true);
            });
    }

    function handleOnChange(target: HTMLInputElement) {
        const { value } = target
        const regex = /^[a-zA-Z\s]*$/;
        if (!regex.test(value)) return;
        setName(value);
    }

    return (
        <>
            {success && <p className="text-white text-lg text-semibold">Highscore submitted</p>}
            {error && <p className="text-white text-lg text-semibold">Error submitting highscore</p>}
            {loading && !success && !error && <LoadingIndicator /> }
            {!loading && <>
                <div className="flex justify-center items-center gap-4">
                    <input type="text" name="name" id="name" placeholder="Name" maxLength={14} value={name} onChange={(e) => handleOnChange(e.target)} className="p-2 rounded-lg text-black w-[160px]" />
                    <button disabled={loading} onClick={submit} className="bg-gray-700 text-white p-2 rounded-lg font-semibold">Submit to highscore</button>
                </div>
            </>}
        </>
    )
}