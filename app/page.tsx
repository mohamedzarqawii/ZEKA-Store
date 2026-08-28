"use client";
import { Button } from "@/components/ui/button";
import HomePage from "@/features/home/HomePage";
import { getProductImageUrls } from "@/services/adminServices/media.service";

const home = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default home;
