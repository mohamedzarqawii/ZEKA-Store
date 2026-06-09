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
import {
  IconBell,
  IconCalendarEvent,
  IconCreditCard,
  IconGift,
  IconGiftCard,
  IconHeart,
  IconLayersSelectedBottom,
  IconLogout2,
  IconMapPin,
  IconQrcode,
  IconShieldHalfFilled,
  IconShoppingCart,
} from "@tabler/icons-react";

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
    <div className="mx-10">
      <div className="flex flex-wrap items-start gap-10 mt-15">
        {/* Left */}
        <div className="top-24 sticky flex flex-col gap-4 w-full max-w-xs">
          <div className="flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-6 border border-primary rounded-3xl h-fit">
            {/* 1 L */}
            <div className="flex flex-col gap-2">
              <div>Hello, {currentUser.firstName} !</div>
              <div className="text-zinc-400 text-xs">{currentUser.email}</div>
              {/* <div className="bg-[#FEFEFE] w-full h-px"></div> */}
            </div>
          </div>

          {/* 2 L */}
          <div className="flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-3 border border-primary rounded-3xl h-fit">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col justify-center items-start gap-3 w-full">
                <div className="flex gap-3 hover:bg-primary p-3 rounded-xl outline-none w-full text-start hover:cursor-pointer">
                  <IconShoppingCart
                    className={`size-5 hover:text-primary transition-color duration-300 `}
                  />
                  <button className="">Orders</button>
                </div>

                <div className="flex items-center gap-3 hover:bg-primary p-3 rounded-xl outline-none w-full text-start hover:cursor-pointer">
                  <IconHeart
                    className={`size-5 hover:text-primary transition-color duration-300 `}
                  />
                  <button className="">Wish List</button>
                </div>

                <div className="flex items-center gap-3 hover:bg-primary p-3 rounded-xl outline-none w-full text-start hover:cursor-pointer">
                  <IconBell
                    className={`size-5 hover:text-primary transition-color duration-300 `}
                  />
                  <button className="">Notifications</button>
                </div>
              </div>
            </div>
          </div>

          {/* 3 L */}
          {/* IconLayersSelectedBottom */}

          <div className="flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-3 border border-primary rounded-3xl h-fit">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col justify-center items-start gap-3 w-full">
                <div className="flex items-center gap-3 bg-primary hover:bg-primary p-3 rounded-xl outline-none w-full text-start hover:cursor-pointer">
                  <CircleUser
                    className={`size-5 hover:text-primary transition-color duration-300 `}
                  />
                  <button className="">Profile</button>
                </div>

                <div className="flex items-center gap-3 hover:bg-primary p-3 rounded-xl outline-none w-full text-start hover:cursor-pointer">
                  <IconMapPin
                    className={`size-5 hover:text-primary transition-color duration-300 `}
                  />
                  <button className="">Adresses</button>
                </div>

                <div className="flex items-center gap-3 hover:bg-primary p-3 rounded-xl outline-none w-full text-start hover:cursor-pointer">
                  <IconCreditCard
                    className={`size-5 hover:text-primary transition-color duration-300 `}
                  />
                  <button className="">Payments</button>
                </div>

                <div className="flex items-center gap-3 hover:bg-primary p-3 rounded-xl outline-none w-full text-start hover:cursor-pointer">
                  <IconGiftCard
                    className={`size-5 hover:text-primary transition-color duration-300 `}
                  />
                  <button className="">Gift Cards</button>
                </div>
              </div>
            </div>
          </div>

          {/* 4 L */}

          <div className="flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-3 border border-primary rounded-3xl h-fit">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col justify-center items-start gap-3 w-full">
                <div className="flex items-center gap-3 hover:bg-primary p-3 rounded-xl outline-none w-full text-start hover:cursor-pointer">
                  <IconShieldHalfFilled
                    className={`size-5 hover:text-primary transition-color duration-300 `}
                  />
                  <button className="">Security Settings</button>
                </div>

                <div className="flex items-center gap-3 hover:bg-primary p-3 rounded-xl outline-none w-full text-start hover:cursor-pointer">
                  <IconQrcode
                    className={`size-5 hover:text-primary transition-color duration-300 `}
                  />
                  <button className="">QR Code</button>
                </div>
              </div>
            </div>
          </div>

          {/* 5 L */}
          <div className="flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-3 border border-primary rounded-3xl h-fit">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col justify-center items-start gap-3 w-full">
                <div className="flex items-center gap-3 hover:bg-primary p-3 rounded-xl outline-none w-full text-start hover:cursor-pointer">
                  <IconLogout2
                    className={`size-5 hover:text-primary transition-color duration-300 `}
                  />
                  <button className="" onClick={handleLogout}>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col flex-1 w-full">
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
                      alert(
                        "Password change functionality is not implemented yet",
                      )
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
      </div>
    </div>
  );
}
