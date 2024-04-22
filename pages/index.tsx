"use client";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { Inter } from "next/font/google";
import { Input } from "../components/ui/input"
import React from 'react';
import RainAnimation from '../components/ui/RainAnimation';

export default function LoginPage() {
  const words = [
    {
      text: "This",
    },
    {
      text: "is",
    },
    {
      text: "a",
    },
    {
      text: "login",
    },
    {
      text: "page",
      className: "text-green-500 dark:text-green-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[49rem]  ">
      <RainAnimation/>
      <Input type="password" placeholder="Password"></Input>
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
