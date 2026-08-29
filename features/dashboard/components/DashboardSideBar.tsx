"use client";

import {
  IconBrandAbstract,
  IconBuildingStore,
  IconCategory,
  IconUsers,
} from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardSideBar = () => {
  const pathname = usePathname();

  const leftBarItems1 = [
    {
      title: "1",
      items: [
        { name: "Users", href: "/admin/users", icon: IconUsers },
        { name: "Products", href: "/admin/products", icon: IconBuildingStore },

        {
          name: `Categories`,
          //   count: favoritesCount,
          href: "/admin/categories",
          icon: IconCategory,
        },
        {
          name: "Brands",
          href: "/admin/brands",
          icon: IconBrandAbstract,
        },
      ],
    },
  ];

  return (
    <div className="top-24 sticky flex flex-col gap-4 w-full min-w-xs max-w-xs h-fit">
      <div className="flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-6 border border-primary rounded-3xl h-fit">
        {/* 1 L */}
        <div className="flex flex-col gap-2">
          <div>ZEKA STORE</div>
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
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 hover:bg-muted/40 p-3 rounded-xl outline-none w-full text-start transition-colors hover:cursor-pointer",
                    // إذا كان الرابط هو الصفحة الرئيسية المطابقة تكون دقيقة، أما لو مسار آخر فيتم فحص بداية المسار
                    (
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href)
                    )
                      ? "bg-primary/40 hover:bg-primary/40"
                      : null,
                  )}
                >
                  <Icon className="size-5" />
                  <span>{item.name}</span>

                  {/* {!!item.count && item.count > 0 && (
                    <span className="bg-primary/20 ml-auto px-2 py-1 rounded-lg text-primary text-xs">
                      {item.count} items
                    </span>
                  )} */}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSideBar;
