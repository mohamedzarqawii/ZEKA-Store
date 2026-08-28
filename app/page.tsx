"use client";
import { Button } from "@/components/ui/button";
import HomePage from "@/features/home/HomePage";
import { supabase } from "@/lib/supabase";
import { getProductImageUrls } from "@/services/adminServices/media.service";

const home = () => {
  return (
    <div>
      <HomePage />
      <Button
        onClick={async () => {
          const urls = await getProductImageUrls();
          console.log(urls);
        }}
      >
        getttgt
      </Button>
    </div>
  );
};

export default home;
