import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { IconTrash } from "@tabler/icons-react";
import { Plus } from "lucide-react";

const PaymentsPage = () => {
  return (
    <div>
      <div className="text-primary text-3xl">PAYMENTS</div>

      <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-10 px-8 py-10 border border-primary rounded-3xl w-full h-fit">
        <div className="flex justify-between gap-8">
          <div className="border border-primary border-dashed rounded-3xl w-full h-fit overflow-hidden hover:cursor-pointer">
            <div className="flex flex-col justify-center items-center p-21.5 rounded-3xl overflow-hidden text-black">
              <Plus className="size-20 text-white" />
              <div className="text-white">Add New Payment</div>
            </div>
          </div>

          <div className="border border-primary rounded-3xl w-full h-fit overflow-hidden">
            <div className="flex flex-col gap-20 bg-[#F3F4F8] mt-[-2] p-6 rounded-3xl overflow-hidden text-black">
              <div className="text-md">Mohamed Zarqawi</div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-centers">
                  <div className="text-xs">Card number</div>
                  <div className="text-xs">Exp.date</div>
                </div>

                <div className="flex justify-between items-center text-black">
                  <div className="text-md">
                    <span className="text-zinc-400">XXXX-XXXX-XXXX-</span>
                    3821
                  </div>
                  <div className="text-md">05/29</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center gap-3 px-6 pt-6 pb-6">
              <div>
                <FieldGroup className="w-full max-w-40">
                  <Field orientation="horizontal">
                    <div className="flex justify-between gap-2">
                      <FieldLabel
                        htmlFor="switch-size-default"
                        className="text-xs"
                      >
                        Default
                      </FieldLabel>
                      <Switch id="switch-size-default" size="default" />
                    </div>
                  </Field>
                </FieldGroup>
              </div>

              <div className="flex items-center">
                <Button variant={"destructive"} size={"lg"} className="gap-2">
                  <IconTrash size={20} />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentsPage;
