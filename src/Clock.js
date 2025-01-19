import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Current Time</h1>
            <p>{time}</p>
        </div>
    );
};

export default Clock;
