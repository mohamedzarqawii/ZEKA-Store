"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/context/AuthContext";
import { Mars, Pencil, Venus } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const { currentUser, updateProfile, deleteAccount } = useAuth();
  const [firstName, setFirstName] = useState(currentUser?.firstName || "");
  const [lastName, setLastName] = useState(currentUser?.lastName || "");
  const [birthday, setBirthday] = useState(currentUser?.birthday || "");
  const [gender, setGender] = useState(currentUser?.gender || "");
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  useEffect(() => {
    if (!currentUser) return;

    setFirstName(currentUser.firstName || "");
    setLastName(currentUser.lastName || "");
    setGender(currentUser.gender || "");
    setBirthday(currentUser.birthday || "");

    if (currentUser.birthday) {
      setDate(new Date(currentUser.birthday));
    }
  }, [currentUser]);

  const handleGender = (gender: string) => {
    if (gender == "male") {
      setGender("male");
    } else setGender("female");
  };

  const handleUpdateProfile = () => {
    updateProfile({
      firstName,
      lastName,
      gender,
      birthday,
    });
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
    <div>
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
        <div className="flex flex-col gap-4 mt-5">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-primary text-sm">First Name</div>
              <input
                className="px-4 py-3 border border-primary rounded-lg outline-none focus:ring-2 focus:ring-secondary w-100"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-primary text-sm">Last Name</div>
              <input
                className="px-4 py-3 border border-primary rounded-lg outline-none focus:ring-2 focus:ring-secondary w-100"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <Field className="w-100">
                <FieldLabel htmlFor="date" className="text-primary text-sm">
                  Birthday
                </FieldLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="justify-start bg-background! p-6 border border-primary rounded-lg outline-none text-md ab"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    className="p-0 w-fit overflow-hidden text-xse"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      defaultMonth={date}
                      captionLayout="dropdown"
                      className="w-80"
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);

                        if (selectedDate) {
                          setBirthday(selectedDate.toISOString());
                        }

                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </Field>
            </div>

            <div className="flex flex-col justify-center gap-2">
              <div className="text-primary text-sm">Gender</div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleGender("male");
                  }}
                  className={`flex justify-center items-center gap-1.5 px-4 py-3 border focus:ring-secondary focus:ring-2 border-primary rounded-lg outline-none w-35 hover:cursor-pointer
                    ${gender == "male" ? "ring-secondary ring-2" : null} `}
                >
                  <Mars className="size-5" />
                  Male
                </button>
                <button
                  onClick={() => {
                    handleGender("female");
                  }}
                  className={`flex justify-center items-center gap-1.5 px-4 py-3 border  border-primary rounded-lg focus:ring-secondary focus:ring-2 outline-none w-35 hover:cursor-pointer
                    ${gender == "female" ? "ring-secondary ring-2" : null} `}
                >
                  <Venus className="size-5" />
                  Female
                </button>
              </div>
            </div>
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
                  alert("Password change functionality is not implemented yet")
                }
              >
                <Pencil className="size-4 text-gray-500 hover:text-primary transition-colors hover:cursor-pointer" />
              </div>
            </div>
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
      </div>
    </div>
  );
}
