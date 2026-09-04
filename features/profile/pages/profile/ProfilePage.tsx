"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { Mars, Venus } from "lucide-react";

import SelectDate from "@/components/myComponents/SelectDate";
import { Field, FieldLabel } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { updateProfileSchema } from "@/types/auth/profile";
import { getChangedValues } from "@/utils/getChangedValues";
import { useUpdateProfile } from "../../hooks/useProfile";

const ProfilePage = () => {
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { mutateAsync: handleUpdateProfile, isPending: isProfileUpdating } =
    useUpdateProfile();

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

  const isLoading = isCurrentUserLoading || !currentUser;

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
                {/* first name */}
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
                {/* last name */}
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
                {/* birthday */}

                <SelectDate
                  date={values?.birthday}
                  onChange={(val) => setFieldValue("birthday", val)}
                  isLoading={isLoading}
                />
              </div>

              <div className="flex flex-col justify-center gap-3">
                <Field>
                  <FieldLabel className="text-primary text-sm">
                    Gender
                  </FieldLabel>
                  <div className="flex gap-2">
                    {isLoading ? (
                      <Skeleton className="rounded-lg w-35 h-13" />
                    ) : (
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
                    )}

                    {isLoading ? (
                      <Skeleton className="rounded-lg w-35 h-13" />
                    ) : (
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
                    )}
                  </div>
                </Field>
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
            isPending={isProfileUpdating}
            pendingText="Updating"
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
