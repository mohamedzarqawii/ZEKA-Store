"use client";

import * as React from "react";
import { useFormik } from "formik";
import { Mars, Pencil, ShieldCogCorner, Venus } from "lucide-react";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/context/AuthContext";
import { updateProfileSchema } from "@/types/auth/profile";
import { getChangedValues } from "@/utils/getChangedValues";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { data: currentUser, isLoading } = useGetCurrentUser();
  const router = useRouter();

  const { handleUpdateProfile } = useAuth();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading && !currentUser) {
      router.replace("/login");
    }
  }, [currentUser, isLoading, router]);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    initialValues,
    dirty,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      gender: currentUser?.gender || null,
      birthday: currentUser?.birthday || null,
    },
    validationSchema: updateProfileSchema,
    onSubmit: async (values) => {
      const changedValues = getChangedValues(values, initialValues);
      await handleUpdateProfile(changedValues);
    },
  });

  const dateValue = values.birthday ? new Date(values.birthday) : undefined;

  if (isLoading) {
    return <div className="p-10 text-primary">Loading profile...</div>;
  }
  if (!currentUser) {
    return null;
  }
  function capitalizeFirstLetter(val: string | undefined) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  function handleErrors(type: string) {
    if (type == "firstName") {
      return capitalizeFirstLetter(errors.firstName);
    } else if (type == "lastName") {
      return capitalizeFirstLetter(errors.lastName);
    }
  }

  return (
    <div>
      <div className="text-primary text-3xl">PROFILE</div>

      {/* contact information */}
      <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-10 px-8 py-10 border border-primary rounded-3xl w-full h-fit">
        <div className="text-md">Contact Information</div>
        <div className="flex flex-wrap gap-4 mt-5">
          <div>
            <Field>
              <FieldLabel htmlFor="name" className="text-primary text-sm">
                Email
              </FieldLabel>
              <Input
                name="email"
                type="text"
                value={currentUser.email}
                onChange={handleChange}
                className="bg-zinc-800/30! w-100! text-zinc-400 hover:cursor-not-allowed"
                readOnly
              />
            </Field>
          </div>
        </div>
      </div>

      {/* personal information */}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-6 px-8 py-10 border border-primary rounded-3xl w-full h-fit">
          <div className="text-md">Personal Information</div>
          <div className="flex flex-col gap-4 mt-5">
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <Field>
                  <FieldLabel htmlFor="name" className="text-primary text-sm">
                    First Name
                  </FieldLabel>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    className="w-100!"
                    aria-invalid={!!errors.firstName && !!touched.firstName}
                  />
                  {errors.firstName && touched.firstName && (
                    <FieldError>{handleErrors("firstName")}</FieldError>
                  )}
                </Field>
              </div>

              <div className="flex flex-col gap-2">
                <Field>
                  <FieldLabel htmlFor="name" className="text-primary text-sm">
                    Last Name
                  </FieldLabel>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    className="w-100!"
                    aria-invalid={!!errors.lastName && !!touched.lastName}
                  />
                  {errors.lastName && touched.lastName && (
                    <FieldError>{handleErrors("lastName")}</FieldError>
                  )}
                </Field>
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
                        className="justify-start bg-background! p-6 border border-primary rounded-lg outline-none w-100 text-md"
                      >
                        {dateValue
                          ? dateValue.toLocaleDateString()
                          : "Select date"}
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

                            // تحديث فورميك بالتاريخ المحلي الصحيح تماماً
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

              <div className="flex flex-col justify-center gap-2">
                <div className="text-primary text-sm">Gender</div>
                <div className="flex gap-2">
                  <Button
                    variant={"outline"}
                    size={"lg"}
                    type="button"
                    onClick={() => setFieldValue("gender", "male")}
                    className={`flex justify-center items-center gap-2 border border-primary rounded-lg outline-none w-35 hover:cursor-pointer transition-all
                      ${values.gender === "male" ? "ring-secondary! ring-2! bg-secondary/10!" : ""}`}
                  >
                    <Mars className="size-5" />
                    Male{" "}
                  </Button>

                  <Button
                    variant={"outline"}
                    size={"lg"}
                    type="button"
                    onClick={() => setFieldValue("gender", "female")}
                    className={`flex justify-center items-center gap-2 border border-primary rounded-lg outline-none w-35 hover:cursor-pointer transition-all
                      ${values.gender === "female" ? "ring-secondary! ring-2! bg-secondary/10!" : ""}`}
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
        <div className="flex gap-3 mt-6">
          <Button
            type="submit"
            variant="default"
            disabled={!dirty}
            className="justify-start p-6 rounded-lg outline-none text-md hover:cursor-pointer"
          >
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
