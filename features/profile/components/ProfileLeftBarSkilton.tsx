"use client";

import React from "react";

export const ProfileLeftBarSkeleton = () => {
  return (
    <div className="top-24 sticky flex flex-col gap-4 w-full max-w-xs h-fit animate-pulse">
      {/* User Info Header Skeleton */}
      <div className="flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-6 border border-primary/20 rounded-3xl h-fit">
        <div className="flex flex-col gap-2">
          {/* Greeting Skeleton */}
          <div className="bg-primary/20 rounded-md w-36 h-6" />
          {/* Email Skeleton */}
          <div className="bg-zinc-700/40 rounded-md w-48 h-4" />
        </div>
      </div>

      {/* Navigation Sections Skeleton (3 Sections) */}
      {[
        { id: 1, itemsCount: 3 }, // Orders, Favorites, Notification
        { id: 2, itemsCount: 4 }, // Profile, Addresses, Payments, Gift Cards
        { id: 3, itemsCount: 2 }, // Security Settings, QR Code
      ].map((section) => (
        <div
          key={section.id}
          className="flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-2.5 border border-primary/20 rounded-3xl h-fit"
        >
          <div className="flex flex-col justify-center items-start gap-2.5 w-full">
            {Array.from({ length: section.itemsCount }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-xl w-full"
              >
                {/* Icon Skeleton */}
                <div className="bg-zinc-700/50 rounded-lg size-5 shrink-0" />
                {/* Nav Link Title Skeleton */}
                <div className="bg-zinc-700/40 rounded-md w-32 h-6" />
                {/* Optional Badge Skeleton for Favorites (Section 1 Item 2) */}
                {section.id === 1 && index === 1 && (
                  <div className="bg-primary/20 ml-auto rounded-full w-16 h-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Sign Out Section Skeleton */}
      <div className="flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-2.5 border border-primary/20 rounded-3xl h-fit">
        <div className="flex items-center gap-2.5 p-3 rounded-xl w-full">
          {/* Sign Out Icon Skeleton */}
          <div className="bg-zinc-700/50 rounded-lg size-5 shrink-0" />
          {/* Sign Out Text Skeleton */}
          <div className="bg-zinc-700/40 rounded-md w-24 h-5" />
        </div>
      </div>
    </div>
  );
};
