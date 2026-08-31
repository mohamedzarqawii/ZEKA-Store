import { Suspense } from "react";
import ProfileLeftBar from "@/features/profile/components/ProfileLeftBar";
import ProfileLeftBarSkeleton from "@/features/profile/components/ProfileLeftBarSkilton";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-10 mb-10">
      <div className="flex items-start gap-10 mt-15">
        <Suspense fallback={<ProfileLeftBarSkeleton />}>
          <ProfileLeftBar />
        </Suspense>
        <div className="flex flex-col flex-1 w-full">{children}</div>
      </div>
    </div>
  );
}
