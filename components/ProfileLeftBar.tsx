"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./animate-ui/primitives/buttons/button";

// import { useFavorites } from "@/context/FavoritesContext";

import {
  ShoppingBasketIcon,
  CreditCardIcon,
  GiftIcon,
  BoltIcon,
  QrCodeIcon,
} from "@animateicons/react/lucide";

import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { User } from "@/components/animate-ui/icons/user";
import { Heart } from "./animate-ui/icons/heart";
import { Bell } from "./animate-ui/icons/bell";
import { MapPin } from "./animate-ui/icons/map-pin";
import { LogOut } from "./animate-ui/icons/log-out";
import { handleHover } from "@/lib/handle-hover";
import type { IconHandle } from "@animateicons/react";
import {
  useGetCurrentUser,
  useLogout,
} from "@/features/auth/pages/hooks/useAuth";

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

          {!!item.count && item.count > 0 && (
            <span className="bg-primary/20 ml-auto px-2 py-1 rounded-lg text-primary text-xs">
              {item.count} items
            </span>
          )}
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

          {!!item?.count && item?.count > 0 && (
            <span className="bg-primary/20 ml-auto px-2 py-1 rounded-lg text-primary text-xs">
              {item?.count} items
            </span>
          )}
        </Link>
      </AnimateIcon>
    </Button>
  );
};

const ProfileLeftBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const logout = useLogout();

  const {
    data: currentUser,
    isLoading: isCurrentUser,
    refetch: refetchcurrentUser,
  } = useGetCurrentUser();
  // const { favoritesData } = useFavorites();

  // const favoritesCount = favoritesData?.length || 0;

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
        {
          name: "Orders",
          href: "/profile/orders",
          icon: icons.Orders,
          type: "lucide",
        },
        {
          name: "Favorites",
          // count: favoritesCount,
          href: "/profile/favorites",
          icon: icons.Favorites,
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

  return (
    <div className="top-24 sticky flex flex-col gap-4 w-full max-w-xs h-fit">
      <div className="flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-6 border border-primary rounded-3xl h-fit">
        <div className="flex flex-col gap-2">
          <div>Hello, {currentUser.firstName} !</div>
          <div className="text-zinc-400 text-xs">{currentUser.email}</div>
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
            onClick={handleLogout}
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

export default ProfileLeftBar;
