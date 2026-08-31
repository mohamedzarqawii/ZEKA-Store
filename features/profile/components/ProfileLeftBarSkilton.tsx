"use client";

// export const ProfileLeftBarSkeleton = () => {
//   return (
//     <div className="top-24 sticky flex flex-col gap-4 w-full max-w-xs h-fit animate-pulse">
//       {/* User Info Header Skeleton */}
// <div className="flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-6 border border-primary/20 rounded-3xl h-fit">
//   <div className="flex flex-col gap-2">
//     {/* Greeting Skeleton */}
//     <div className="bg-primary/20 rounded-md w-36 h-6" />
//     {/* Email Skeleton */}
//     <div className="bg-zinc-700/40 rounded-md w-48 h-4" />
//   </div>
// </div>

//       {/* Navigation Sections Skeleton (3 Sections) */}
//       {[
//         { id: 1, itemsCount: 3 }, // Orders, Favorites, Notification
//         { id: 2, itemsCount: 4 }, // Profile, Addresses, Payments, Gift Cards
//         { id: 3, itemsCount: 2 }, // Security Settings, QR Code
//       ].map((section) => (
//         <div
//           key={section.id}
//           className="flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-2.5 border border-primary/20 rounded-3xl h-fit"
//         >
//           <div className="flex flex-col justify-center items-start gap-2.5 w-full">
//             {Array.from({ length: section.itemsCount }).map((_, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-4 p-3 rounded-xl w-full"
//               >
//                 {/* Icon Skeleton */}
//                 <div className="bg-zinc-700/50 rounded-lg size-5 shrink-0" />
//                 {/* Nav Link Title Skeleton */}
//                 <div className="bg-zinc-700/40 rounded-md w-32 h-6" />
//                 {/* Optional Badge Skeleton for Favorites (Section 1 Item 2) */}
//                 {section.id === 1 && index === 1 && (
//                   <div className="bg-primary/20 ml-auto rounded-full w-16 h-6" />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}

//       {/* Sign Out Section Skeleton */}
//       <div className="flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-2.5 border border-primary/20 rounded-3xl h-fit">
//         <div className="flex items-center gap-2.5 p-3 rounded-xl w-full">
//           {/* Sign Out Icon Skeleton */}
//           <div className="bg-zinc-700/50 rounded-lg size-5 shrink-0" />
//           {/* Sign Out Text Skeleton */}
//           <div className="bg-zinc-700/40 rounded-md w-24 h-5" />
//         </div>
//       </div>
//     </div>
//   );
// };

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { Button } from "../../../components/animate-ui/primitives/buttons/button";

import {
  BoltIcon,
  CreditCardIcon,
  GiftIcon,
  QrCodeIcon,
  ShoppingBasketIcon,
} from "@animateicons/react/lucide";

import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { User } from "@/components/animate-ui/icons/user";
import { Badge } from "@/components/ui/badge";


import { handleHover } from "@/lib/handle-hover";
import type { IconHandle } from "@animateicons/react";
import { Bell } from "../../../components/animate-ui/icons/bell";
import { Heart } from "../../../components/animate-ui/icons/heart";
import { LogOut } from "../../../components/animate-ui/icons/log-out";
import { MapPin } from "../../../components/animate-ui/icons/map-pin";

const icons = {
  Orders: ShoppingBasketIcon,
  Favorites: Heart,
  Notification: Bell,
  Profile: User,
  Adresses: MapPin,
  Payments: CreditCardIcon,
  "Gift Cards": GiftIcon,
  "Security Settings": BoltIcon,
  "QR Code": QrCodeIcon,
};

const SidebarNavItem = ({
  item,
  pathname,
}: {
  item: any;
  pathname: string;
}) => {
  const pathnames = usePathname();
  const isFavoritesPage = pathnames === "/profile/favorites";
  const iconRef = useRef<IconHandle>(null);
  const Icon = item.icon;

  if (item.type === "lucide") {
    return (
      <Button
        className="w-full"
        onMouseEnter={(e) => handleHover(e, iconRef)}
        onMouseLeave={(e) => handleHover(e, iconRef)}
        hoverScale={1.02}
        tapScale={0.98}
      >
        <Link
          href={item.href}
          className={`flex items-center gap-4 hover:bg-muted/40 p-3 rounded-xl outline-none w-full text-start transition-colors hover:cursor-pointer ${
            pathname === item.href ? "bg-primary/40 hover:bg-primary/40" : ""
          }`}
        >
          <Icon className="size-5" ref={iconRef} />
          <span>{item.name}</span>
        </Link>
      </Button>
    );
  }

  return (
    <Button className="w-full" hoverScale={1.02} tapScale={0.98}>
      <AnimateIcon animateOnHover className="w-full">
        <Link
          href={item.href}
          className={`flex items-center gap-4 hover:bg-muted/40 p-3 rounded-xl outline-none w-full text-start transition-colors hover:cursor-pointer ${
            pathname === item.href ? "bg-primary/40 hover:bg-primary/40" : ""
          }`}
        >
          <Icon className="size-5" />
          <span>{item.name}</span>

          {!!item.count && item.count > 0 && (
            <Badge
              variant="default"
              className={
                isFavoritesPage
                  ? "border-border bg-input/20 text-foreground dark:bg-input/30 [a]:hover:bg-muted [a]:hover:text-muted-foreground ml-auto text-xs"
                  : "bg-primary/20 ml-auto text-primary text-xs"
              }
            >
              <div className="ml-auto rounded-full w-12" />
            </Badge>
          )}
        </Link>
      </AnimateIcon>
    </Button>
  );
};

const ProfileLeftBarSkeleton = () => {
  const pathname = usePathname();
  const router = useRouter();

  const leftBarItems1 = [
    {
      title: "1",
      items: [
        {
          name: "Orders",
          href: "/profile/orders",
          icon: icons.Orders,
          type: "lucide",
        },
        {
          name: "Favorites",
          href: "/profile/favorites",
          icon: icons.Favorites,
          count: 1,
          type: "animate-ui",
        },
        {
          name: "Notification",
          href: "/profile/notifications",
          icon: icons.Notification,
          type: "animate-ui",
        },
      ],
    },
    {
      title: "2",
      items: [
        {
          name: "Profile",
          href: "/profile",
          icon: icons.Profile,
          type: "animate-ui",
        },
        {
          name: "Adresses",
          href: "/profile/addresses",
          icon: icons.Adresses,
          type: "animate-ui",
        },
        {
          name: "Payments",
          href: "/profile/payments",
          icon: icons.Payments,
          type: "lucide",
        },
        {
          name: "Gift Cards",
          href: "/profile/giftCards",
          icon: icons["Gift Cards"],
          type: "lucide",
        },
      ],
    },
    {
      title: "3",
      items: [
        {
          name: "Security Settings",
          href: "/profile/securitySettings",
          icon: icons["Security Settings"],
          type: "lucide",
        },
        {
          name: "QR Code",
          href: "/profile/QRcode",
          icon: icons["QR Code"],
          type: "lucide",
        },
      ],
    },
  ];
  // if (isCurrentUserLoading || !currentUser || isFavoritesDataLoading) {
  //   return <ProfileLeftBarSkeleton />;
  // }

  return (
    <div className="top-24 sticky flex flex-col gap-4 w-full max-w-xs h-fit">
      <div className="flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-6 border border-primary rounded-3xl h-fit">
        <div className="flex flex-col gap-2">
          {/* Greeting Skeleton */}
          <div className="bg-primary/20 rounded-md w-36 h-6" />
          {/* Email Skeleton */}
          <div className="bg-zinc-700/40 rounded-md w-48 h-4" />
        </div>
      </div>

      {leftBarItems1.map((section) => (
        <div
          key={section.title}
          className="flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-2.5 border border-primary rounded-3xl h-fit"
        >
          <div className="flex flex-col justify-center items-start gap-2.5 w-full">
            {section.items.map((item) => (
              <SidebarNavItem key={item.href} item={item} pathname={pathname} />
            ))}
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-2.5 border border-primary rounded-3xl h-fit">
        <div className="flex flex-col justify-center items-start gap-2.5 w-full">
          <Button
            hoverScale={1.02}
            tapScale={0.98}
            className="flex items-center gap-2.5 hover:bg-muted/40 p-3 rounded-xl outline-none w-full text-start transition-colors duration-400 hover:cursor-pointer"
          >
            <AnimateIcon animateOnHover>
              <LogOut className="size-5" />
            </AnimateIcon>
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileLeftBarSkeleton;
