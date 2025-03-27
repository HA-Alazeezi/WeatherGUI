import React from 'react';

const WellnessPage = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Wellness Page</h1>

            <section id="breathing" style={{ marginBottom: '20px' }}>
                <h2>Breathing Exercises</h2>
                <p>Try these simple breathing exercises to relax and reduce stress:</p>
                <ul>
                    <li>
                        <strong>4-7-8 Breathing:</strong> Inhale for 4 seconds, hold your breath for 7 seconds, and exhale slowly for 8 seconds. Repeat 4 times.
                    </li>
                    <li>
                        <strong>Box Breathing:</strong> Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, and hold for 4 seconds. Repeat for 1-2 minutes.
                    </li>
                </ul>
            </section>

            <section id="self-care" style={{ marginBottom: '20px' }}>
                <h2>Self-care</h2>
                <p>Take time for yourself with these self-care tips:</p>
                <ul>
                    <li>Go for a walk in nature to clear your mind.</li>
                    <li>Take a warm bath or shower to relax your muscles.</li>
                    <li>Write in a journal to process your thoughts and emotions.</li>
                </ul>
            </section>

            <section id="mindfullness" style={{ marginBottom: '20px' }}>
                <h2>Mindfulness and Sleep</h2>
                <p>Improve your sleep and mindfulness with these tips:</p>
                <ul>
                    <li>Practice meditation for 10 minutes before bed to calm your mind.</li>
                    <li>Maintain a consistent sleep schedule, even on weekends.</li>
                    <li>Avoid screens at least 1 hour before bedtime to reduce blue light exposure.</li>
                </ul>
            </section>

            <section id="suppoer" style={{ marginBottom: '20px' }}>
                <h2>University Support Services</h2>
                <p>If you're feeling overwhelmed, remember that your university offers support services:</p>
                <ul>
                    <li>Contact the counseling center for mental health support.</li>
                    <li>Join student wellness workshops or peer support groups.</li>
                    <li>Reach out to your academic advisor for guidance and resources.</li>
                </ul>
            </section>
        </div>
    );
};

export default WellnessPage;