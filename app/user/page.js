"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoggedOut } from "../../Reducer/AuthSlice";

export default function UserSettings() {
  const [previewImage, setPreviewImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    image: null, // For storing image base64 data
  });

  const [initials, setInitials] = useState("");

  useEffect(() => {
    // Fetch user email from session storage
    const email = sessionStorage.getItem("userEmail");
    if (email) {
      fetchUserDetails(email);
    }
  }, []);

  useEffect(() => {
    // Generate initials from the user's first name
    if (user.fullName) {
      const firstLetter = user.fullName.charAt(0).toUpperCase();
      setInitials(firstLetter);
    }
  }, [user.fullName]);

  // Fetch user details from the backend
  const fetchUserDetails = async (email) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setUser(data);
        if (data.image) {
          setPreviewImage(data.image); // Set image preview
        }
      } else {
        console.error("Failed to fetch user details:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Handle Logout Functionality
  const handleLogout = () => {
    dispatch(setLoggedOut());
    if (typeof window !== "undefined") {
      sessionStorage.clear();
    }
    router.push("/login");
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Preview image
        setUser({ ...user, image: reader.result }); // Update user image in state
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', user.email);
      formData.append('fullName', user.fullName);
      
      // If user has selected a new image
      if (user.image) {
        // Convert base64 to file
        const response = await fetch(user.image);
        const blob = await response.blob();
        formData.append('image', blob, 'profile-image.png');
      }
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/updateUser`,
        {
          method: "POST",
          body: formData,
          // No need to set Content-Type, it will be set automatically with boundary for multipart/form-data
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        console.error("Error updating profile:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-between items-start min-h-screen bg-black text-white px-10 ">
      <div className="bg-black min-h-screen flex flex-col p-8 rounded-lg shadow-lg w-full px-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl geologica-bold">ACCOUNT SETTINGS</h1>
          <button
            onClick={handleLogout}
            className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Display Avatar */}
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
            {user.fullName || "No Image Available"}
          </div>
        </div>

        {/* Input Fields */}
        <form onSubmit={handleSubmit} className="max-w-2xl mt-5 min-h">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={user.fullName}
                    onChange={(e) =>
                      setUser({ ...user, fullName: e.target.value })
                    }
                    className="w-full p-2 rounded border border-gray-600 bg-black text-white"
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

              <div className="mt-4 flex items-center gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Password</label>
                  <input
                    type="password"
                    value="************"
                    readOnly
                    className="w-full p-2 rounded border border-gray-600 bg-black text-white"
                  />
                </div>
                <button
                  type="button"
                  className="p-2 mt-8 bg-white text-black rounded hover:bg-gray-300"
                >
                  Reset Password
                </button>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="mt-6 p-3 bg-[#71C4ED] text-white rounded transition-colors text-[#000000]"
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
