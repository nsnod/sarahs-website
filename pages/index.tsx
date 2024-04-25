"use client";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { Inter } from "next/font/google";
import { Input } from "../components/ui/input"
import React from 'react';
import RainAnimation from '../components/ui/RainAnimation';

export default function LoginPage() {
  const words = [
    {
      text: "Welcome!",
    },
    {
      text: "<3",
      className: "text-[#9ccaff] dark:text-[#9ccaff]",
    },
    {
      text: "Enter the",
    },
    {
      text: "secret password!",
    },
    {
      text: ":D",
      className: "text-[#9ccaff] dark:text-[#9ccaff]",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[70rem]  ">
      <RainAnimation/>
      <img src={"/images/gifs/three_totoros.gif"} alt="description" />
      <Input type="password" placeholder="Password"></Input>
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
