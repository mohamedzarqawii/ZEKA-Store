"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function TableSkilton(columnCount: number, rowCount: number) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-end items-center gap-2 w-full">
        <div>
          {/* button */}
          <Skeleton className="rounded-md w-11 h-10" />
        </div>

        {/* Search  */}
        <div className="flex items-center">
          {/* input */}
          <Skeleton className="border-brder rounded-md w-68 h-10" />
        </div>

        {/* Row Filter */}
        <div>
          <Skeleton className="rounded-md w-11 h-10" />
        </div>

        {/* Columns Filter */}
        <div>
          <Skeleton className="rounded-md w-11 h-10" />
        </div>
      </div>

      <div className="relative flex flex-col gap-7 p-6 border border-border rounded-3xl w-full h-fit">
        <div className="flex flex-col gap-6 w-full">
          {Array.from({ length: 1 }).map((_, index) => (
            <div className="flex gap-4 w-full h-full" key={index}>
              <Skeleton className="w-full min-w-60 h-8" />
              <Skeleton className="w-full min-w-50 h-8" />
              <Skeleton className="w-full min-w-45 h-8" />
              <Skeleton className="w-full min-w-40 h-8" />
              <Skeleton className="w-full min-w-35 h-8" />
            </div>
          ))}
          <div className="-mx-6 border-border border-b w-full"></div>
        </div>
        {Array.from({ length: rowCount }).map((_, index) => (
          <div className="flex gap-4 w-full h-full" key={index}>
            <Skeleton className="w-full min-w-60 h-8" />
            <Skeleton className="w-full min-w-50 h-8" />
            <Skeleton className="w-full min-w-45 h-8" />
            <Skeleton className="w-full min-w-40 h-8" />
            <Skeleton className="w-full min-w-35 h-8" />
          </div>
        ))}
      </div>
    </div>
  );
}
