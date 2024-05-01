import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RainAnimation from '../components/ui/RainAnimation';

export default function Loading() {
  const router = useRouter();
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard/maindash');
    }, 3000);

    const dotTimer = setInterval(() => {
      setDotCount((prevCount) => (prevCount + 1) % 5); // cycles through 0 to 4
    }, 200);

    return () => {
      clearTimeout(timer);
      clearInterval(dotTimer);
    };
  }, [router]);

  const dots = (
    <span className="dots-container">
      {Array.from({ length: 4 }, (_, i) => (
        <span key={i} className={`dot ${i < dotCount ? 'visible' : 'hidden'}`}>.</span>
      ))}
    </span>
  );

  return (
    <div className="flex items-center justify-center h-screen">
      <RainAnimation />
      <div className="text-center">
        <img src={"/images/gifs/haku.gif"} alt="Hovering dragon" style={{ width: '200px', height: 'auto', margin: '0 auto' }} />
        <h1 className="text-4xl font-bold text-white mt-4">
          Booting up your dashboard now{dots}
        </h1>
      </div>
    </div>
  );
}
