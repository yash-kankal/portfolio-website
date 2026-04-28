import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Yash Kankal — Full Stack Developer",
  description:
    "Full Stack Developer building production-grade backends, real-time systems, and scalable APIs. MS IT from Arizona State University.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body className="antialiased">
        {/* Runs before paint — reads localStorage and adds "light" class if needed. Dark is the default so no class = dark. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light');}catch(e){}})()`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
