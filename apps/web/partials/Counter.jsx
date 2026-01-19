import React, { useState, useEffect, useRef } from 'react';

const Counter = ({ targetNumber, trigger, duration = 4500, decimals = 4 }) => {

    const [count, setCount] = useState(0);
    const elementRef = useRef(null);

    useEffect(() => {
        const startTime = Date.now();
        const step = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const currentNumber = (progress * targetNumber).toFixed(decimals);
            setCount(currentNumber);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

    requestAnimationFrame(step);

}, [targetNumber, duration, trigger, decimals]);

    return (
        <span ref={elementRef}>
            {count.toLocaleString()}
        </span>
    );
};

export default Counter;