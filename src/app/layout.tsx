import type { Metadata } from "next";
import "./globals.css";

import { Fredoka } from 'next/font/google'

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
})


export const metadata: Metadata = {
  title: "Memory Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={`${fredoka.variable} antialiased sm:mx-40 mx-2 `}>
        {children}
      </body>
    </html>
  );
}
