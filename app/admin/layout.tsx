import DashboardSideBar from "@/features/dashboard/components/DashboardSideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-10 mb-10 min-w-0 max-w-full">
      <div className="flex items-start gap-10 mt-15 min-w-0 max-w-full">
        <DashboardSideBar />

        {/* 👈 التعديل هنا: أضفنا min-w-0 و overflow-hidden للـ flex-1 */}
        <div className="flex flex-col flex-1 w-full min-w-0 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
