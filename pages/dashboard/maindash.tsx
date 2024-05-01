import React from 'react';
import { GetServerSideProps } from 'next';
import TwinklingStars from '../../components/ui/TwinklingStars';
import ShootingStar from '../../components/ui/ShootingStar';
import Moon from '../../components/ui/moon';

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const { auth } = req.cookies;  

  // check if cookie
  if (!auth || auth !== 'true') {
    // no cookie redirect to index
    return {
      redirect: {
        destination: '/', 
        permanent: false,
      },
    };
  }

  // If authenticated, continue to render the Home page
  return {
    props: {},  // You can pass props to your page component here
  };
};
