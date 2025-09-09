import type { Metadata } from "next";
import { Nanum_Myeongjo} from "next/font/google";
import "./globals.css";

const nanummyeongjo = Nanum_Myeongjo({
  variable: "--font-nanum-myeongjo",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export const metadata: Metadata = {
  title: "GRowth Mindset",
  description: "A productivity app to help you stay on track and grow your garden.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nanummyeongjo.variable}>
        {children}
      </body>
    </html>
  );
}
