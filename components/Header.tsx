"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./animate-ui/primitives/buttons/button";
import { User } from "./animate-ui/icons/user";
import { ShoppingCartIcon } from "@animateicons/react/lucide";
import { AnimateIcon } from "./animate-ui/icons/icon";
import { ShieldCogCorner } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "HOME", href: "/" },
    { name: "SHOP", href: "/shop" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  const { currentUser } = useAuth();

  return (
    <header className="top-0 left-0 z-50 sticky backdrop-blur-md w-full">
      <div className="flex justify-between items-center px-10 w-full h-20">
        <div
          className="hover:cursor-pointer"
          //  onClick={router.push("/admin")}
        >
          <img
            src="/images/zekaLogo.png"
            className="bg-transparent w-30 object-contain"
          />
        </div>

        <div className="flex items-center gap-5">
          {menuItems.map((item, i) => (
            <Link key={i} href={item.href}>
              <Button
                className={`menu-item hover:cursor-pointer rounded-full ${
                  pathname === item.href
                    ? "menu-item-active rounded-full"
                    : "menu-item-inactive "
                }`}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </div>

        <div className="flex justify-center items-center gap-3">
          <div>
            {currentUser?.role?.name === "Admin" ? (
              <Button className="hover:cursor-pointer">
                <Link href="/admin">
                  <ShieldCogCorner
                    className={`p-1 size-8 hover:cursor-pointer hover:text-primary transition-color duration-300  ${
                      pathname.includes("/admin")
                        ? "text-primary"
                        : "hover:text-primary"
                    }`}
                  />
                </Link>
              </Button>
            ) : null}
          </div>
          <div>
            {currentUser ? (
              <Link href="/profile">
                <Button className="hover:cursor-pointer">
                  <AnimateIcon animateOnHover>
                    <User
                      className={`p-1 size-8 hover:cursor-pointer hover:text-primary transition-color duration-300  ${
                        pathname.includes("/profile")
                          ? "text-primary"
                          : "hover:text-primary"
                      }`}
                    />
                  </AnimateIcon>
                </Button>
              </Link>
            ) : (
              <Link
                href="/login"
                // className={`login-button ${pathname === "/login" ? "text-primary border-primary " : " hover:text-primary hover:border-primary "}`}
              >
                <Button
                  className={`relative hover:cursor-pointer login-button ${pathname === "/login" ? "text-primary border-primary " : " hover:text-primary hover:border-primary "}`}
                >
                  LOG IN
                </Button>
              </Link>
            )}
          </div>

          <Link
            href="/cart"
            className="flex items-center p-1 rounded-lg hover:text-primary transition-color duration-300 hover:cursor-pointer"
          >
            <Button className="hover:cursor-pointer">
              <ShoppingCartIcon
                className={`hover:cursor-pointer ${pathname === "/cart" ? "text-primary" : "hover:text-primary"}`}
              />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
