import React from 'react';
import TwinklingStars from '../../components/ui/TwinklingStars';
import ShootingStar from '../../components/ui/ShootingStar';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[70rem] pt-50 relative">
      <TwinklingStars numberOfStars={200} />
      <ShootingStar />
      <div className="container" style={{ zIndex: 999 }}>
        <img src="/images/main_totoro/totoro.png" alt="Totoro" className="totoro-img" />
      </div>

    </div>
  );
}
