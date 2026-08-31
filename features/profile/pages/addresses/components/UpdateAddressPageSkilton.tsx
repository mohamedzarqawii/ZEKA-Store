import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";

export const UpdateAddressSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      {/* عنوان الصفحة الرئيسي */}
      <div className="text-primary text-3xl">Edit Address</div>

      {/* القسم الأول: تفاصيل العنوان (Address Details) */}
      <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-6 px-8 py-8 border border-primary/30 rounded-3xl w-full h-fit">
        <div className="font-semibold text-lg">Address Details</div>

        <div className="flex flex-wrap gap-6 mt-5">
          {/* عنوان العنوان (Address Title Buttons) */}
          <div className="flex flex-col">
            <FieldLabel
              htmlFor="addressTitle"
              className="mb-2 text-primary text-sm"
            >
              Address Title
            </FieldLabel>
            <div id="addressTitle" className="flex gap-3">
              <Button type="button" variant={"outline"}>
                Home
              </Button>
              <Button type="button" variant={"outline"}>
                Work
              </Button>
              <Button type="button" variant={"outline"}>
                Other
              </Button>
            </div>
          </div>

          {/* Address Line Input */}
          <div className="flex flex-col gap-2 w-full">
            <FieldLabel className="text-primary text-sm">
              Address Line
            </FieldLabel>
            <Skeleton className="bg-input/30 px-4 py-3 border border-primary/30 rounded-lg w-full h-13" />
          </div>

          {/* Address Details Input */}
          <div className="flex flex-col gap-2 w-full">
            <FieldLabel className="text-primary text-sm">
              Address Details
            </FieldLabel>
            <Skeleton className="bg-input/30 px-4 py-3 border border-primary/30 rounded-lg w-full h-13" />
          </div>

          {/* Country, City & ZIP Row */}
          <div className="flex sm:flex-row flex-col gap-3 w-full">
            <div className="flex flex-col flex-1 gap-2">
              <FieldLabel className="text-primary text-sm">
                Country<span className="text-destructive">*</span>
              </FieldLabel>
              <Skeleton className="bg-input/30 px-4 py-3 border border-primary/30 rounded-lg w-full h-13" />
            </div>

            <div className="flex flex-col flex-1 gap-2">
              <FieldLabel className="text-primary text-sm">
                City<span className="text-destructive">*</span>
              </FieldLabel>
              <Skeleton className="bg-input/30 px-4 py-3 border border-primary/30 rounded-lg w-full h-13" />
            </div>

            <div className="flex flex-col flex-1 gap-2">
              <FieldLabel className="text-primary text-sm">ZIP Code</FieldLabel>
              <Skeleton className="bg-input/30 px-4 py-3 border border-primary/30 rounded-lg w-full h-13" />
            </div>
          </div>
        </div>
      </div>

      {/* القسم الثاني: تفاصيل المستلم (Receiver Details) */}
      <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-6 px-8 py-8 border border-primary/30 rounded-3xl w-full h-fit">
        <div className="font-semibold text-lg">Receiver Details</div>

        <div className="flex flex-wrap gap-6 mt-5">
          {/* Full Name Input */}
          <div className="flex flex-col gap-2 w-full sm:w-96">
            <FieldLabel className="text-primary text-sm">Full Name</FieldLabel>
            <Skeleton className="bg-input/30 px-4 py-3 border border-primary/30 rounded-lg w-full h-13" />
          </div>

          {/* Phone Code & Phone Number */}
          <div className="flex gap-3 w-full">
            <div className="flex flex-col gap-2 w-40">
              <FieldLabel className="text-primary text-sm">
                Country Code
              </FieldLabel>
              <Skeleton className="bg-input/30 px-4 py-3 border border-primary/30 rounded-lg w-full h-13" />
            </div>

            <div className="flex flex-col gap-2 w-full sm:w-96">
              <FieldLabel className="text-primary text-sm">
                Phone Number
              </FieldLabel>
              <Skeleton className="bg-input/30 px-4 py-3 border border-primary/30 rounded-lg w-full h-13" />
            </div>
          </div>
        </div>
      </div>

      {/* زر الحفظ والتحديث (Submit Button) */}
      <div className="flex justify-end mt-6">
        <Skeleton className="bg-primary/40 rounded-lg w-40 h-13" />
      </div>
    </div>
  );
};

export default UpdateAddressSkeleton;
