import React, { useEffect, useState, KeyboardEvent } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { Input } from "../components/ui/input";
import RainAnimation from '../components/ui/RainAnimation';

interface LoginPageProps {
  isAuthenticated?: boolean;
}

export default function LoginPage({ isAuthenticated }: LoginPageProps) {
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/loading');
    }
  }, [isAuthenticated, router]);

  const handleLogin = async () => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();
    if (data.success) {
      router.push('/loading');
    } else {
      alert('Incorrect Password');
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const words = [
    { text: "Welcome!", },
    { text: "<3", className: "text-[#9ccaff] dark:text-[#9ccaff]" },
    { text: "Enter the", },
    { text: "secret password!", },
    { text: ":D", className: "text-[#9ccaff] dark:text-[#9ccaff]" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-[70rem]">
      <RainAnimation />
      <img src={"/images/gifs/three_totoros.gif"} alt="Three Totoros" />
      <Input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={e => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<LoginPageProps> = async (context) => {
  const { req } = context;
  const { auth } = req.cookies;

  if (auth === 'true') {
    return {
      redirect: {
        destination: '/loading',
        permanent: false,
      },
      props: {},
    };
  }

  return {
    props: {
      isAuthenticated: false,
    },
  };
};
