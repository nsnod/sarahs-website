import React from 'react';
import { GetServerSideProps } from 'next';
import TwinklingStars from '../../components/ui/TwinklingStars';
import ShootingStar from '../../components/ui/ShootingStar';
import Moon from '../../components/ui/moon';
import ToDoList from '../../components/ui/todolist';

export default function Home() {
  return (
    <div className="relative">
      <Moon />
      <TwinklingStars numberOfStars={200} />
      <ShootingStar />
      <div className="flex flex-col items-center justify-center">
        <img src="/images/main_totoro/totoro_main_image.png" alt="Totoro" className="totoro-img" 
             style={{ zIndex: 1001, transform: 'translateY(-15%)' }} />
      </div>
      <div className="mt-5 md:mt-10" style={{ zIndex: 1000 }}>
        <ToDoList/>
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
