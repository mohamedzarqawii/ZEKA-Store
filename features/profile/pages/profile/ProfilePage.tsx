"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { Mars, Venus } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { updateProfileSchema } from "@/types/auth/profile";
import { getChangedValues } from "@/utils/getChangedValues";
import { useRouter } from "next/navigation";
import { useUpdateProfile } from "../../hooks/useProfile";

function parseBirthdayDate(value: string | null | undefined) {
  if (!value) return undefined;

  const [year, month, day] = value.slice(0, 10).split("-").map(Number);

  if (!year || !month || !day) return undefined;

  return new Date(year, month - 1, day);
}

function formatBirthday(value: string | null | undefined) {
  if (!value) return "Select date";

  const [year, month, day] = value.slice(0, 10).split("-");

  if (!year || !month || !day) return "Select date";

  return `${month}/${day}/${year}`;
}

const ProfilePage = () => {
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { mutateAsync: handleUpdateProfile, isPending: isProfileUpdating } =
    useUpdateProfile();

  const router = useRouter();

  const [open, setOpen] = useState(false);

  type ProfileFormValues = {
    first_name: string;
    last_name: string;
    gender: "male" | "female" | null;
    birthday: string | null;
  };
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    initialValues,
    dirty,
  } = useFormik<ProfileFormValues>({
    enableReinitialize: true,
    initialValues: {
      first_name: currentUser?.first_name || "",
      last_name: currentUser?.last_name || "",
      gender: currentUser?.gender || null,
      birthday: currentUser?.birthday || null,
    },
    validationSchema: updateProfileSchema,
    onSubmit: async (values) => {
      if (!currentUser) return;
      const changedValues = getChangedValues(values, initialValues);
      await handleUpdateProfile({
        userId: currentUser?.id,
        body: changedValues,
      });
    },
  });

  const dateValue = parseBirthdayDate(values.birthday);

  const isLoading = isCurrentUserLoading || !currentUser;

  function capitalizeFirstLetter(val: string | undefined) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  function handleErrors(type: string) {
    if (type == "first_name") {
      return capitalizeFirstLetter(errors.first_name);
    } else if (type == "last_name") {
      return capitalizeFirstLetter(errors.last_name);
    }
  }

  return (
    <div>
      <div className="text-primary text-3xl">PROFILE</div>

      {/* contact information */}
      <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-10 px-8 py-10 border border-primary rounded-3xl w-full h-fit">
        <div className="text-md">Contact Information</div>
        <div className="flex flex-wrap gap-4 mt-5">
          <Input
            name="email"
            type="text"
            value={currentUser?.email}
            onChange={handleChange}
            className="w-100!"
            readOnly
            label="Email"
            errors={errors}
            touched={touched}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* personal information */}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-6 px-8 py-10 border border-primary rounded-3xl w-full h-fit">
          <div className="text-md">Personal Information</div>
          <div className="flex flex-col gap-4 mt-5">
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <Input
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  isRequired={true}
                  value={values.first_name}
                  onChange={handleChange}
                  className="w-100!"
                  errors={errors}
                  touched={touched}
                  isLoading={isLoading}
                  aria-invalid={!!errors.first_name && !!touched.first_name}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Input
                  label="Last Name"
                  id="last_name"
                  name="last_name"
                  value={values.last_name}
                  onChange={handleChange}
                  className="w-100!"
                  errors={errors}
                  touched={touched}
                  isLoading={isLoading}
                  aria-invalid={!!errors.last_name && !!touched.last_name}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <Field className="w-100">
                  <FieldLabel htmlFor="date" className="text-primary text-sm">
                    Birthday
                  </FieldLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        id="date"
                        className="justify-start bg-background! p-6 border border-primary rounded-lg outline-none w-100 h-13 text-md"
                      >
                        {formatBirthday(values.birthday)}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent
                      className="p-0 w-fit overflow-hidden text-xse"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={dateValue}
                        defaultMonth={dateValue}
                        captionLayout="dropdown"
                        className="w-80"
                        onSelect={(selectedDate) => {
                          if (selectedDate) {
                            const year = selectedDate.getFullYear();
                            const month = String(
                              selectedDate.getMonth() + 1,
                            ).padStart(2, "0");
                            const day = String(selectedDate.getDate()).padStart(
                              2,
                              "0",
                            );

                            const localDateString = `${year}-${month}-${day}`;

                            setFieldValue("birthday", localDateString);
                          } else {
                            setFieldValue("birthday", "");
                          }
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
              </div>

              <div className="flex flex-col justify-center gap-3">
                <div className="text-primary text-sm">Gender</div>
                <div className="flex gap-2">
                  <Button
                    variant={"outline"}
                    size={"icon-lg"}
                    type="button"
                    onClick={() => setFieldValue("gender", "male")}
                    className={`p-6 text-md gap-2 border-primary rounded-lg outline-none w-35 hover:cursor-pointer transition-all
                      ${values.gender === "male" ? "ring-secondary! ring-1! bg-secondary/10!" : ""}`}
                  >
                    <Mars className="size-5" />
                    Male
                  </Button>

                  <Button
                    variant={"outline"}
                    size={"icon-lg"}
                    type="button"
                    onClick={() => setFieldValue("gender", "female")}
                    className={`p-6 text-md gap-2 border-primary rounded-lg outline-none w-35 hover:cursor-pointer transition-all
                      ${values.gender === "female" ? "ring-secondary! ring-1! bg-secondary/10!" : ""}`}
                  >
                    <Venus className="size-5" />
                    Female
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Information */}

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            type="submit"
            variant="default"
            disabled={!dirty || isProfileUpdating}
            isLoading={isProfileUpdating}
            loadingText="Updating . . ."
            className="p-6 rounded-lg outline-none text-md hover:cursor-pointer"
          >
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  );
};
export default ProfilePage;
