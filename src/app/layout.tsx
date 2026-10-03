// app/layout.tsx
import type { ReactNode } from "react";
import { Hind_Siliguri, Anek_Bangla } from "next/font/google";
import Header from "./components/Navbar/Header";
import "./globals.css";

const body = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

// Heavy display face for the "দেশস্পন্দন" logo
const logo = Anek_Bangla({
  subsets: ["bengali", "latin"],
  weight: ["800"],
  variable: "--font-logo",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bn" className={`${body.variable} ${logo.variable} bg-[#F5F1E8]`}>
      <body className="font-sans">
        <Header />
        {children}
      </body>
    </html>
  );
}

/* ---------- Tailwind v4: app/globals.css ----------
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-body), system-ui, sans-serif;
  --font-logo: var(--font-logo), var(--font-body), sans-serif;
}

---------- Tailwind v3: tailwind.config.ts ----------
theme: {
  extend: {
    fontFamily: {
      sans: ["var(--font-body)", "system-ui", "sans-serif"],
      logo: ["var(--font-logo)", "var(--font-body)", "sans-serif"],
    },
  },
},
*/
