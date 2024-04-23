import React from 'react';
import RainDrop from './RainDrop';

const RainAnimation: React.FC = () => {
    const numberOfDrops = 100;
    const generateRaindrops = () => {
        return Array.from({ length: numberOfDrops }).map((_, index) => {
            const duration = Math.random() * 2 + 1; 
            const delay = Math.random() * -20; 
            const leftPosition = Math.random() * 100; 

            return (
                <RainDrop
                    key={index}
                    style={{
                        animationDuration: `${duration}s`,
                        animationDelay: `${delay}s`,
                        left: `${leftPosition}%`
                    }}
                />
            );
        });
    };

    return (
        <div className="rain-container">
            {generateRaindrops()}
        </div>
    );
};

export default RainAnimation;
