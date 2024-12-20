"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    image: null,
    fullName: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = sessionStorage.getItem("userEmail");
        if (!email) return;

        const response = await fetch("/api/user/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileClick = () => {
    router.push("/user");
  };
  const handlesettingClick = () => {
    router.push("setting");
  };

  const handlelogoClick = () => {
    router.push("/");
  };

  // Function to get initials from full name
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

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

      <div className="mt-auto flex justify-center flex-col items-center gap-4 logo">
        <div onClick={handlesettingClick}>
          <Image
            priority
            src="/setting.svg"
            alt="Settings Icon"
            width={45}
            height={45}
            className="object-contain"
          />
        </div>

        <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center logo">
          {userData.image ? (
            <Image
              priority
              src={userData.image}
              onClick={handleProfileClick}
              alt="Profile"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              onClick={handleProfileClick}
              className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-semibold cursor-pointer"
            >
              {getInitials(userData.fullName)}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
