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
        <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-10 px-8 py-10 border border-primary rounded-3xl w-full h-fit">
          <div className="text-md">Receive Communications In</div>
          <div className="flex flex-col gap-2 mt-5">
            <div className="text-primary text-sm">Language</div>

            <SelectInput
              placeholder="Select Language"
              selectItems={["English", "Arabic"]}
            />
          </div>
        </div>

        {/* ------------------- */}
        <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-10 px-8 py-10 border border-primary rounded-3xl w-full h-fit">
          <div className="text-md">Marketing Preferences</div>
          <div className="flex flex-col gap-2 mt-5">
            <FieldGroup className="w-full min-w-sm">
              <div className="flex gap-3">
                <FieldLabel
                  htmlFor="switch-email"
                  className="flex justify-center"
                >
                  <Field
                    orientation="horizontal"
                    className="flex justify-between items-center"
                  >
                    <FieldContent>
                      <div className="flex justify-between items-center">
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
                    className="flex justify-between items-center"
                  >
                    <FieldContent>
                      <div className="flex justify-between items-center">
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
                    className="flex justify-between items-center"
                  >
                    <FieldContent>
                      <div className="flex justify-between items-center">
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

            <div className="mt-2 text-zinc-500 text-xs">
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
