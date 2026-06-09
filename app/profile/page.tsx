"use client";

import { useAuth } from "@/context/AuthContext";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const { currentUser, logout, updateProfile, deleteAccount } = useAuth();
  const [firstName, setFirstName] = useState(currentUser?.firstName || "");
  const [lastName, setLastName] = useState(currentUser?.lastName || "");

  const handleUpdateProfile = () => {
    updateProfile(firstName, lastName);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleDeleteAccount = () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete your account? This action cannot be undone.",
    );
    if (confirmDelete) {
      deleteAccount();
      router.push("/login");
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="mx-10">
      <div className="mt-15">
        <div className="text-primary text-3xl">PROFILE</div>

        {/* contact information */}

        <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-10 px-8 py-10 border border-primary rounded-3xl w-full h-fit">
          <div className="text-md">Contact Information</div>
          <div className="flex flex-wrap gap-4 mt-5">
            <div className="flex flex-col gap-2">
              <div className="text-primary text-sm">Email</div>
              <input
                className="px-4 py-3 border border-primary rounded-lg outline-none w-100 hover:cursor-not-allowed"
                type="text"
                defaultValue={currentUser.email}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* personal information */}
        <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-6 px-8 py-10 border border-primary rounded-3xl w-full h-fit">
          <div className="text-md">Personal Information</div>
          <div className="flex flex-wrap gap-4 mt-5">
            <div className="flex flex-col gap-2">
              <div className="text-primary text-sm">First Name</div>
              <input
                className="px-4 py-3 border border-primary rounded-lg outline-none focus:ring-2 focus:ring-secondary w-100"
                type="text"
                defaultValue={currentUser.firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-primary text-sm">Last Name</div>
              <input
                className="px-4 py-3 border border-primary rounded-lg outline-none focus:ring-2 focus:ring-secondary w-100"
                type="text"
                defaultValue={currentUser.lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Security Information */}
        <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-6 px-8 py-10 border border-primary rounded-3xl w-full h-fit">
          <div className="text-md">Security Information</div>
          <div className="flex flex-wrap gap-4 mt-5">
            <div className="flex flex-col gap-2">
              <div className="text-primary text-sm">Password</div>
              <div className="relative w-full">
                <input
                  className="px-4 py-3 pr-10 border border-primary rounded-lg outline-none focus:ring-2 focus:ring-secondary w-100"
                  type="password"
                  placeholder="Enter current password"
                  value={currentUser?.password || ""}
                  readOnly
                />
                <div
                  className="right-0 absolute inset-y-0 flex items-center pr-3"
                  onClick={() =>
                    alert(
                      "Password change functionality is not implemented yet",
                    )
                  }
                >
                  <Pencil className="size-4 text-gray-500 hover:text-primary transition-colors hover:cursor-pointer" />
                </div>
              </div>
            </div>

            {/* delete account buton */}
            <div className="flex flex-col gap-2">
              <button
                className="bg-red-700 hover:bg-red-900 px-4 py-3 rounded-lg h-full text-center transition-colors duration-300 hover:cursor-pointer"
                onClick={() => handleDeleteAccount()}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            className="bg-primary hover:bg-secondary px-4 py-3 rounded-lg text-center transition-colors duration-300 hover:cursor-pointer"
            onClick={handleUpdateProfile}
          >
            Update Profile
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-3 border border-primary rounded-lg outline-none hover:cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
