import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RainAnimation from '../components/ui/RainAnimation';

export default function Loading() {
  const router = useRouter();
  const [dotCount, setDotCount] = useState(0);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       router.push('/dashboard/maindash');
//     }, 100000);

//     const dotTimer = setInterval(() => {
//       setDotCount((prevCount) => (prevCount + 1) % 5);
//     }, 200);

//     return () => {
//       clearTimeout(timer);
//       clearInterval(dotTimer);
//     };
//   }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <RainAnimation />
      <div className="text-center">
      <img src={"/images/gifs/haku.gif"} alt="Hovering dragon" style={{ width: '200px', height: 'auto', margin: '0 auto' }} />
        <h1 className="text-4xl font-bold text-white mt-4">
          Booting up your dashboard now
        </h1>
      </div>
    </div>
  );
}
