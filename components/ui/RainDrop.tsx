// src/components/ui/RainDrop.tsx

import React from 'react';

interface RainDropProps {
    style: React.CSSProperties;
}

const RainDrop: React.FC<RainDropProps> = ({ style }) => {
    return <div className="raindrop" style={style} />;
};

export default RainDrop;
