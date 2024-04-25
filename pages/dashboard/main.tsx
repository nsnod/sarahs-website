import React from 'react';
import TwinklingStars from '../../components/ui/TwinklingStars';
import ShootingStar from '../../components/ui/ShootingStar';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-50 relative">
      <TwinklingStars numberOfStars={200} />
      <ShootingStar />
      <div className="container">
        <img src="/images/main_totoro/totoro.png" alt="Totoro" className="totoro-img" />
      </div>

    </div>
  );
}
