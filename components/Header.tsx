"use client";
import { IconShoppingCart } from "@tabler/icons-react";
import { Phone, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Header = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "HOME", href: "/" },
    { name: "SHOP", href: "/shop" },
    // { name: "CATEGORY", href: "/category" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <header className="top-0 left-0 z-50 sticky backdrop-blur-md w-full">
      <div className="flex justify-between items-center px-10 w-full h-20">
        <div className="">
          <img
            src="/images/image2.png"
            className="bg-transparent w-30 object-contain"
          />
        </div>

        <div className="flex items-center gap-5">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={`menu-item ${
                pathname === item.href
                  ? "menu-item-active"
                  : "menu-item-inactive"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div>
            <Link
              href="/login"
              className={`login-button ${pathname === "/login" ? "text-[#FC6216]" : " hover:text-[#FC6216] "}`}
            >
              LOG IN
            </Link>
          </div>

          <Link
            href="/cart"
            className="p-1 rounded-lg hover:text-[#F97A14] transition-color duration-300"
          >
            <IconShoppingCart
              className={`${pathname === "/cart" ? "text-[#F97A14]" : "hover:text-[#F95A20]"}`}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
