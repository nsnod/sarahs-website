import React from 'react';
import TwinklingStars from '../../components/ui/TwinklingStars';
import ShootingStar from '../../components/ui/ShootingStar';
import Moon from '../../components/ui/moon';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Moon />
      <TwinklingStars numberOfStars={200} />
      <ShootingStar />
      <div className="flex flex-col items-center justify-center h-[50rem] pt-50 relative" style={{ zIndex: 999 }}>
        <img src="/images/main_totoro/totoro_main_image.png" alt="Totoro" className="totoro-img" />
      </div>
    </div>
  );
}
