"use client";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { useGetCart } from "@/features/cart/pages/hooks/useCart";
import { ShoppingCartIcon } from "@animateicons/react/lucide";
import { ShieldCogCorner } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimateIcon } from "./animate-ui/icons/icon";
import { User } from "./animate-ui/icons/user";
import { Button } from "./animate-ui/primitives/buttons/button";
import { Skeleton } from "./ui/skeleton";

const Header = () => {
  const pathname = usePathname();
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { data: cart = [], isLoading: isCartLoading } = useGetCart(
    currentUser?.id,
  );

  const menuItems = [
    { name: "HOME", href: "/" },
    { name: "SHOP", href: "/shop" },
    { name: "ABOUT", href: "/aboutUs" },
    { name: "CONTACT", href: "/contact" },
  ];

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

        {isCurrentUserLoading || isCartLoading ? (
          <div className="flex justify-center items-center gap-3 -m-1">
            <Skeleton className="rounded-md w-7 h-7" />
            <Skeleton className="rounded-md w-7 h-7" />
            {/* <Skeleton className="rounded-full w-7 h-7" /> */}
            {/* <Skeleton className="rounded-md w-20 h-7" /> */}
          </div>
        ) : (
          <div className="flex justify-center items-center gap-3">
            <div className="flex justify-center items-center">
              {currentUser?.role === "admin" ? (
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
            <div className="flex justify-center items-center mt-1">
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
            {currentUser && (
              <Link href="/cart" className="inline-flex relative">
                <Button className="flex justify-center items-center hover:cursor-pointer">
                  <ShoppingCartIcon
                    className={`hover:cursor-pointer ${pathname === "/cart" ? "text-primary" : "hover:text-primary"}`}
                  />
                  {cart.length > 0 ? (
                    <span className="-top-2 -right-2 absolute flex justify-center items-center bg-primary/70 rounded-full w-4 h-4 text-[8px]">
                      {cart.length}
                    </span>
                  ) : null}
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
