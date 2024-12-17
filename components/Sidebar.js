'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Sidebar() {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/user"); // Route to the user.js page
  };
  const handlelogoClick=()=>{
    router.push('/')
  }
  
  return (
    <aside className="w-20 h-screen bg-white flex flex-col items-center py-6">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          priority
          onClick={handlelogoClick}
          src="/raid-logo.gif" 
          alt="Eye Icon"
          width={60} 
          height={60} 
          className="object-contain logo"
          unoptimized 
        />
      </div>

      <div className="mt-auto flex justify-center flex-col items-center gap-4">
        <Image
          priority
          src="/setting.svg" 
          alt="Settings Icon"
          width={45} 
          height={45} 
          className="object-contain"
        />
        <Image
          priority
          src="/user.png" 
          onClick={handleProfileClick}
          alt="Profile"
          width={48} 
          height={48} 
          className="user"
        />
      </div>
    </aside>
  );
}