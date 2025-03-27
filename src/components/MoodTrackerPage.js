import React, { useState, useEffect, use } from 'react';
import './MoodTracker.css';


function MoodTrackerPage() {
    const [mood, setMood] = useState('');
    const [notes, setNotes] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [quote, setQuote] = useState('');
    const [log, setLog] = useState([]);


    const quotes = [
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "It does not matter how slowly you go as long as you do not stop. - Confucius",
        "The only way to do great work is to love what you do. - Steve Jobs",
        "The best way to predict the future is to create it. - Peter Drucker",
        "The best preparation for tomorrow is doing your best today. - H. Jackson Brown Jr.",
        "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
        "The secret of getting ahead is getting started. - Mark Twain",
        "The only way to achieve the impossible is to believe it is possible. - Charles Kingsleigh",
    ];

    // Loading previous submission using localStorage, saves browser data

    useEffect(() => {
        const storedLog = localStorage.getItem('moodLog');
        if (storedLog) {
            setLog(JSON.parse(storedLog));
        }
    }, []);

    useEffect(() => {
        if (submitted) {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setQuote(randomQuote);            
        }
    }, [submitted]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEntry = { mood, notes, date: new Date().toLocaleString() };

        // Update log and store in localStorage
        const updateLog = [newEntry, ...log];
        setLog(updateLog);
        localStorage.setItem('moodLog', JSON.stringify(updateLog));

        setSubmitted(true);
    };

    return (
        <div className= "mood-tracker">
            <div style={{ padding: '20px'}}>
                {!submitted ? (
                    <form onSubmit={handleSubmit}>
                        <h1>Mood Tracker</h1>
                        <div>
                            <label htmlFor="mood">How are you feeling today?</label>
                            <input
                                type="text"
                                id="mood"
                                value={mood}
                                onChange={(e) => setMood(e.target.value)}
                                placeholder="Enter your mood"
                                required
                                style={{ display: 'block', margin: '10px 0', padding: '5px' }} />
                        </div>
                        <div>
                            <label htmlFor="notes">Notes:</label>
                            <textarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Write down your thoughts..."
                                style={{ display: 'block', margin: '10px 0', padding: '5px', width: '100%', height: '100px' }} />
                        </div>
                        <button className="submit-button" type="submit" >
                            Submit
                        </button>
                    </form>
                ) : (
                    <div>
                        <h1>Thanks for sharing your mood!</h1>
                        <p>You are feeling: <strong>{mood}</strong></p>
                        <p>Notes: <em>{notes}</em></p>
                        {quote && <p>Quote of the Day: <em>"{quote}"</em></p>}
                        <button onClick={() => setSubmitted(false)} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                            Share Again
                        </button>
                    </div>
                )}
            </div>

            {log.length > 0 && (
                <div style={{ padding: '20px' }}>
                    <h2>Previous logs</h2>
                    <ul className="mood-log">
                        {log.map((entry, index) => (
                            <li key={index} >
                                <p><strong>{entry.mood}</strong> - {entry.date}</p>
                                <p>Mood: {entry.mood}</p>
                                <p>Notes: {entry.notes}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
export default MoodTrackerPage;

