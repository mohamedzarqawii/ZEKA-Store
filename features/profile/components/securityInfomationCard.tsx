import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { resetPassword } from "@/services/auth.service";
import { resetPassSchema } from "@/types/auth/resetPassword";
import { getChangedValues } from "@/utils/getChangedValues";

import { useFormik } from "formik";
import { Pencil } from "lucide-react";
import React from "react";

const SecurityInfomationCard = () => {
  const { handleResetPassword } = useAuth();

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    setValues,
    initialValues,
    dirty,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      currentPassword: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: resetPassSchema,
    onSubmit: async (values) => {
      const changedValues = getChangedValues(values, initialValues);
      await handleResetPassword(changedValues);
    },
  });

  function capitalizeFirstLetter(val: string | undefined) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  function handleErrors(type: string) {
    if (type == "currentPassword") {
      return capitalizeFirstLetter(errors.currentPassword);
    } else if (type == "password") {
      return capitalizeFirstLetter(errors.password);
    } else if (type == "passwordConfirmation") {
      return capitalizeFirstLetter(errors.passwordConfirmation);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-6 px-8 py-10 border border-primary rounded-3xl w-full h-fit">
        <div className="text-md">Change Password</div>
        <div className="flex flex-wrap gap-4 mt-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Field>
                <FieldLabel htmlFor="name" className="text-primary text-sm">
                  Current Password<span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  value={values.currentPassword}
                  onChange={handleChange}
                  type="password"
                  autoComplete="current-password"
                  className="w-100!"
                  aria-invalid={
                    !!errors.currentPassword && !!touched.currentPassword
                  }
                />
                {errors.currentPassword && touched.currentPassword && (
                  <FieldError>{handleErrors("currentPassword")}</FieldError>
                )}
              </Field>
            </div>

            <div className="flex gap-4">
              <Field>
                <FieldLabel htmlFor="name" className="text-primary text-sm">
                  New Password<span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  type="password"
                  autoComplete="new-password"
                  className="w-100!"
                  aria-invalid={!!errors.password && !!touched.password}
                />
                {errors.password && touched.password && (
                  <FieldError>{handleErrors("password")}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="passwordConfirmation"
                  className="text-primary text-sm"
                >
                  Confirmation password
                  <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  type="password"
                  autoComplete="new-password"
                  className="w-100!"
                  aria-invalid={
                    !!errors.passwordConfirmation &&
                    !!touched.passwordConfirmation
                  }
                />
                {errors.passwordConfirmation &&
                  touched.passwordConfirmation && (
                    <FieldError>
                      {handleErrors("passwordConfirmation")}
                    </FieldError>
                  )}
              </Field>
            </div>
          </div>
          <Button
            type="submit"
            variant="default"
            disabled={!dirty}
            className="justify-start p-6 rounded-lg outline-none text-md"
          >
            Change Password
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SecurityInfomationCard;
