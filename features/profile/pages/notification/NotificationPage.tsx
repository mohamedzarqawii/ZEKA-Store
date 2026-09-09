import SelectInput from "@/components/myComponents/Select";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { Mail, MessageCircleMore } from "lucide-react";

const NotificationPage = () => {
  return (
    <div>
      <div className="text-primary text-3xl">NOTIFICATIONS</div>
      <div className="mt-10">
        <div className="border-primary mt-10 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-10 backdrop-blur-md">
          <div className="text-md">Receive Communications In</div>
          <div className="mt-5 flex flex-col gap-2">
            <div className="text-primary text-sm">Language</div>

            <SelectInput
              placeholder="Select Language"
              selectItems={["English", "Arabic"]}
            />
          </div>
        </div>

        {/* ------------------- */}
        <div className="border-primary mt-10 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-10 backdrop-blur-md">
          <div className="text-md">Marketing Preferences</div>
          <div className="mt-5 flex flex-col gap-2">
            <FieldGroup className="w-full min-w-sm">
              <div className="flex gap-3">
                <FieldLabel
                  htmlFor="switch-email"
                  className="flex justify-center"
                >
                  <Field
                    orientation="horizontal"
                    className="flex items-center justify-between"
                  >
                    <FieldContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Mail size={20} />
                          <FieldTitle className="text-md">Email</FieldTitle>
                        </div>
                        <Switch id="switch-email" />
                      </div>
                    </FieldContent>
                  </Field>
                </FieldLabel>

                <FieldLabel
                  htmlFor="switch-sms"
                  className="flex justify-center"
                >
                  <Field
                    orientation="horizontal"
                    className="flex items-center justify-between"
                  >
                    <FieldContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <MessageCircleMore size={20} />
                          <FieldTitle className="text-md">SMS</FieldTitle>
                        </div>
                        <Switch id="switch-email" />
                      </div>
                    </FieldContent>
                  </Field>
                </FieldLabel>

                <FieldLabel
                  htmlFor="switch-whatsapp"
                  className="flex justify-center"
                >
                  <Field
                    orientation="horizontal"
                    className="flex items-center justify-between"
                  >
                    <FieldContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <IconBrandWhatsapp size={23} />
                          <FieldTitle className="text-md">Whatsapp</FieldTitle>
                        </div>
                        <Switch id="switch-email" />
                      </div>
                    </FieldContent>
                  </Field>
                </FieldLabel>
              </div>
            </FieldGroup>

            <div className="mt-2 text-xs text-zinc-500">
              Opting out halts promotional messages, but you’ll still receive
              important service updates.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotificationPage;
