import React from 'react';
import TwinklingStars from '../../components/ui/TwinklingStars';
import ShootingStar from '../../components/ui/ShootingStar';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-50 relative">
      <TwinklingStars numberOfStars={200} />
      <ShootingStar />
      <div className="flex flex-col items-center justify-center h-[90rem] pt-20"> {/* Added padding-top here */}
        <img src="/images/main_totoro/totoro.png" alt="Totoro" style={{ zIndex: 10, position: 'relative' }} />
      </div>
    </div>
  );
}
