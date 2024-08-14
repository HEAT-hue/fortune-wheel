import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const ConfettiEffect: React.FC = () => {
    // Get the window size using the useWindowSize hook
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>
            <Confetti width={width} height={1000} />
        </div>
    );
};

export default ConfettiEffect;