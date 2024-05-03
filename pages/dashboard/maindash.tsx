import React from 'react';
import { GetServerSideProps } from 'next';
import TwinklingStars from '../../components/ui/TwinklingStars';
import ShootingStar from '../../components/ui/ShootingStar';
import Moon from '../../components/ui/moon';
import ToDoList from '../../components/ui/todolist';

export default function Home() {
  return (
    <div className="relative">
      <div>
        <Moon />
        <TwinklingStars numberOfStars={200} />
        <ShootingStar />
      </div>
      <div className="flex-grow flex flex-col items-center justify-center" style={{ minHeight: '20vh', display: 'flex', alignItems: 'center' }}>
        <img src="/images/main_totoro/totoro_main_image.png" alt="Totoro" 
             style={{ zIndex: 1001, transform: 'translateY(-10%)' }} />
      </div>
      <div style={{ zIndex: 1002, marginTop: '-10rem', marginBottom: '20rem' }}>
        <ToDoList />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const { auth } = req.cookies;

  if (!auth || auth !== 'true') {
    return {
      redirect: {
        destination: '/', 
        permanent: false,
      },
    };
  }

  return { props: {} };
};
