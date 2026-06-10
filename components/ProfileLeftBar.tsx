"use client";

import React from "react";
import {
  IconBell,
  IconCreditCard,
  IconGiftCard,
  IconHeart,
  IconLogout2,
  IconMapPin,
  IconQrcode,
  IconShieldHalfFilled,
} from "@tabler/icons-react";

import { useAuth } from "@/context/AuthContext";
import { CircleUser, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProfileLeftBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout, updateProfile, deleteAccount } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!currentUser) {
    return null;
  }

  const leftBarItems1 = [
    {
      title: "1",
      items: [
        { name: "Orders", href: "/profile/orders", icon: ShoppingBag },
        { name: "Wishlists", href: "/profile/wishList", icon: IconHeart },
        {
          name: "Notification",
          href: "/profile/notifications",
          icon: IconBell,
        },
      ],
    },
    {
      title: "2",
      items: [
        { name: "Profile", href: "/profile", icon: CircleUser },
        { name: "Adresses", href: "/profile/adresses", icon: IconMapPin },
        { name: "Payments", href: "/profile/payments", icon: IconCreditCard },
        { name: "Gift Cards", href: "/profile/giftCards", icon: IconGiftCard },
      ],
    },
    {
      title: "3",
      items: [
        {
          name: "Security Settings",
          href: "/profile/securitySettings",
          icon: IconShieldHalfFilled,
        },
        { name: "QR Code", href: "/profile/QRcode", icon: IconQrcode },
      ],
    },
  ];

  return (
    <div className="top-24 sticky flex flex-col gap-4 w-full max-w-xs h-fit">
      <div className="flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-6 border border-primary rounded-3xl h-fit">
        {/* 1 L */}
        <div className="flex flex-col gap-2">
          <div>Hello, {currentUser.firstName} !</div>
          <div className="text-zinc-400 text-xs">{currentUser.email}</div>
          {/* <div className="bg-[#FEFEFE] w-full h-px"></div> */}
        </div>
      </div>

      {leftBarItems1.map((section) => (
        <div
          key={section.title}
          className="flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-2.5 border border-primary rounded-3xl h-fit"
        >
          <div className="flex flex-col justify-center items-start gap-2.5 w-full">
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 hover:bg-primary p-3 rounded-xl outline-none w-full text-start transition-colors hover:cursor-pointer ${pathname == item.href ? "bg-primary" : null} `}
                >
                  <Icon className="size-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      {/* 5 L */}
      <div className="flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-3 border border-primary rounded-3xl h-fit">
        <div className="flex flex-col justify-center items-start gap-3 w-full">
          <div
            onClick={handleLogout}
            className="flex items-center gap-3 hover:bg-primary p-3 rounded-xl outline-none w-full text-start transition-colors duration-400 hover:cursor-pointer"
          >
            <IconLogout2 className="size-5" />
            <span>Sign Out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLeftBar;
