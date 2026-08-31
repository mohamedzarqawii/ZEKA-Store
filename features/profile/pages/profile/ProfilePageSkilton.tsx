"use client";

import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";

const ProfilePageSkeleton = () => {
  return (
    <div className="w-full">
      {/* Title Skeleton */}
      <div className="text-primary text-3xl">PROFILE</div>

      {/* Contact Information Card */}
      <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-10 px-8 py-10 border border-primary rounded-3xl w-full h-fit">
        <div className="text-md">Contact Information</div>
        <div className="flex flex-wrap gap-4 mt-5">
          <div className="flex flex-col gap-2 w-100">
            <FieldLabel htmlFor="name" className="text-primary text-sm">
              Email
            </FieldLabel>
            <Skeleton className="px-4 py-3 rounded-lg w-full h-13" />
          </div>
        </div>
      </div>

      {/* Personal Information Card */}
      <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-6 px-8 py-10 border border-primary rounded-3xl w-full h-fit">
        <div className="text-md">Personal Information</div>

        <div className="flex flex-col gap-4 mt-5">
          {/* First Name & Last Name */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 w-100">
              <FieldLabel htmlFor="name" className="text-primary text-sm">
                First Name
              </FieldLabel>
              <Skeleton className="px-4 py-3 rounded-lg w-full h-13" />
            </div>

            <div className="flex flex-col gap-2 w-100">
              <FieldLabel htmlFor="name" className="text-primary text-sm">
                Last Name
              </FieldLabel>
              <Skeleton className="px-4 py-3 rounded-lg w-full h-13" />
            </div>
          </div>

          {/* Birthday & Gender */}
          <div className="flex items-center gap-4">
            {/* Birthday Field */}
            <div className="flex flex-col gap-2 w-100">
              <FieldLabel htmlFor="date" className="text-primary text-sm">
                Birthday
              </FieldLabel>
              <Skeleton className="rounded-lg w-100 h-13" />
            </div>

            {/* Gender Field */}
            <div className="flex flex-col justify-center gap-3">
              <div className="text-primary text-sm">Gender</div>

              <div className="flex gap-2">
                <Skeleton className="rounded-lg w-35 h-13" />
                <Skeleton className="rounded-lg w-35 h-13" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button Skeleton */}
      <div className="flex justify-end gap-3 mt-6">
        <Button
          type="submit"
          disabled={true}
          variant="default"
          className="p-6 rounded-lg outline-none text-md hover:cursor-pointer"
        >
          Update Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfilePageSkeleton;
