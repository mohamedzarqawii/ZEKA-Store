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
            src="/images/zekaLogo.png"
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
              className={`login-button ${pathname === "/login" ? "text-primary border-primary " : " hover:text-primary hover:border-primary "}`}
            >
              LOG IN
            </Link>
          </div>

          <Link
            href="/cart"
            className="p-1 rounded-lg hover:text-primary transition-color duration-300"
          >
            <IconShoppingCart
              className={`${pathname === "/cart" ? "text-primary" : "hover:text-secondary"}`}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
