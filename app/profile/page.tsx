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
import { CircleUser, Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconCalendarEvent } from "@tabler/icons-react";

export default function Profile() {
  const router = useRouter();
  const { currentUser, logout, updateProfile, deleteAccount } = useAuth();
  const [firstName, setFirstName] = useState(currentUser?.firstName || "");
  const [lastName, setLastName] = useState(currentUser?.lastName || "");

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

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
          <div>
            <div className="relative flex">
              <Field className="w-100">
                <FieldLabel htmlFor="date" className="text-primary text-sm">
                  Birthday
                </FieldLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="justify-start !bg-background p-6 border border-primary rounded-lg outline-none text-md ab"
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
                      onSelect={(date) => {
                        setDate(date);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </Field>
              <IconCalendarEvent />
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
