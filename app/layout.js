import { Geist, Geist_Mono } from "next/font/google";
import "./styles/global.css";
import Header from "./components/header";
import { AuthUserProvider } from "./context/AuthUserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Facebook",
  description: "Mmm data so good",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthUserProvider>
          <Header />
          <main>{children}</main>
        </AuthUserProvider>
      </body>
    </html>
  );
}
