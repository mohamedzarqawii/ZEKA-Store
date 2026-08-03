import DashboardSideBar from "@/features/dashboard/components/DashboardSideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-10 mb-10">
      <div className="flex items-start gap-10 mt-15">
        <DashboardSideBar />
        <div className="flex flex-col flex-1 w-full">{children}</div>
      </div>
    </div>
  );
}
