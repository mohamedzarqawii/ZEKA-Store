import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const AddressesPageSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      {/* عنوان الصفحة */}
      <div className="text-primary text-3xl">ADDRESSES</div>

      {/* الحاوية الرئيسية */}
      <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-10 px-8 py-10 border border-primary rounded-3xl w-full h-fit">
        {/* شريط الهيدر (العنوان + زر إضافة عنوان) */}
        <div className="flex justify-between">
          <div className="mb-10 text-md">Saved Addresses</div>
          <Button>Add New</Button>
        </div>

        {/* شبكة العناوين (Grid of 2) */}
        <div className="gap-4 grid grid-cols-2 w-full">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col gap-4 bg-card px-4 py-5 border border-border rounded-md w-full"
            >
              {/* شريط بطاقة العنوان العلوي */}
              <div className="flex justify-between items-center">
                <Skeleton className="bg-primary/20 rounded-md w-24 h-5" />
                <div className="flex items-center gap-2">
                  <Skeleton className="bg-primary/20 rounded-md w-10 h-8" />
                  <Skeleton className="bg-primary/20 rounded-md w-12 h-8" />
                  <Skeleton className="bg-primary/20 rounded-md w-14 h-8" />
                </div>
              </div>

              {/* خط الفاصل */}
              <Skeleton className="bg-primary/20 my-1 w-full h-px" />

              {/* تفاصيل العنوان */}
              <div className="flex flex-col gap-4">
                <Skeleton className="bg-primary/20 rounded-md w-1/3 h-4" />
                <Skeleton className="bg-primary/20 rounded-md w-3/4 h-4" />
                <Skeleton className="bg-primary/20 rounded-md w-1/2 h-4" />
                <Skeleton className="bg-primary/20 rounded-md w-2/3 h-4" />
                <Skeleton className="bg-primary/20 rounded-md w-1/2 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressesPageSkeleton;
