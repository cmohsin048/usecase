"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoggedOut } from "../../Reducer/AuthSlice";
import { Eye, EyeOff } from "lucide-react";

export default function UserSettings() {
  const [previewImage, setPreviewImage] = useState(null);
  const [showResetFields, setShowResetFields] = useState(false);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [cooldownTime, setCooldownTime] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    image: null,
  });

  const [initials, setInitials] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const email = sessionStorage.getItem("userEmail");
    if (email) {
      fetchUserDetails(email);
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (user.fullName) {
      const firstLetter = user.fullName.charAt(0).toUpperCase();
      setInitials(firstLetter);
    }
  }, [user.fullName]);

  useEffect(() => {
    let timer;
    if (cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldownTime]);

  const fetchUserDetails = async (email) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/getUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
          credentials: "include",
        }
      );
      const data = await response.json();

      if (response.ok) {
        setUser(data);
        if (data.image) {
          setPreviewImage(data.image);
        }
      } else {
        console.error("Failed to fetch user details:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleLogout = () => {
    dispatch(setLoggedOut());
    sessionStorage.clear();
    router.push("/login");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setUser((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPasswordClick = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
          credentials: "include",
        }
      );
      const data = await response.json();

      if (response.ok) {
        setShowResetFields(true);
        setCooldownTime(60);
        alert("OTP has been sent to your email");
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP");
    }
  };

  const handleResendOTP = () => {
    if (cooldownTime === 0) {
      handleResetPasswordClick();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", user.email);
      formData.append("fullName", user.fullName);

      if (showResetFields) {
        if (!otp || !newPassword) {
          alert("Please enter both OTP and new password");
          return;
        }
        formData.append("otp", otp);
        formData.append("newPassword", newPassword);
      }

      if (user.image) {
        const response = await fetch(user.image);
        const blob = await response.blob();
        formData.append("image", blob, "profile-image.png");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/updateUser`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
        if (showResetFields) {
          setShowResetFields(false);
          setOtp("");
          setNewPassword("");
        }
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="flex justify-between items-start min-h-screen bg-black text-white px-10">
      <div className="bg-black min-h-screen flex flex-col p-8 rounded-lg shadow-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">ACCOUNT SETTINGS</h1>
          <button
            onClick={handleLogout}
            className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="flex justify-start gap-2 items-center mb-6">
          <div className="w-40 h-40 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
            {previewImage ? (
              <img
                src={previewImage}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-semibold">{initials || "?"}</span>
            )}
          </div>
          <div className="ml-4 text-gray-400">
            {user.fullName || "No Name Available"}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mt-5">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={user.fullName}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, fullName: e.target.value }))
                    }
                    className="w-full p-2 rounded border border-gray-600 bg-black text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full p-2 rounded border border-gray-600 bg-black text-white"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-gray-400 mb-2">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 rounded border border-gray-600 bg-black text-white"
                />
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleResetPasswordClick}
                  className="p-2 bg-white text-black rounded hover:bg-gray-300 transition-colors"
                >
                  Reset Password
                </button>

                {showResetFields && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-2">
                        Enter OTP
                      </label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full p-2 rounded border border-gray-600 bg-black text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full p-2 rounded border border-gray-600 bg-black text-white pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={cooldownTime > 0}
                      className={`p-2 ${
                        cooldownTime > 0
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-white hover:bg-gray-300"
                      } text-black rounded transition-colors`}
                    >
                      {cooldownTime > 0
                        ? `Resend OTP (${cooldownTime}s)`
                        : "Resend OTP"}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="mt-6 p-3 bg-[#71C4ED] text-black rounded hover:bg-[#5DB1DA] transition-colors font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
