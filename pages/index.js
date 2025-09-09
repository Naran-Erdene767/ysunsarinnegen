import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-row">
      <div className="w-1/2 h-screen bg-green-300">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4JAb358SafpFByr4kKjbeyDZ1yT3VZaBVlw&s" class="w-full h-full"/>
      </div>
      <div className="w-1/2 h-screen bg-blue-300">
        <img src="https://img.freepik.com/free-photo/autumn-person-with-beautiful-hat_23-2149137839.jpg?semt=ais_hybrid&w=740&q=80" class="w-full h-full"/>
      </div>
    </div>
  );
}
