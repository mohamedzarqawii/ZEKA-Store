"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FieldError, FieldLabel } from "@/components/ui/field";
import { useFormik } from "formik";
import { resetPasswordSchema } from "@/types/auth/forgotPassword";
import { useResetPassword } from "../hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";

export default function ResetPasswordPage() {
  const router = useRouter();

  const { mutateAsync: handleResetPassword, isPending: isReseting } =
    useResetPassword();

  type ResetPasswordValues = {
    password: string;
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
  } = useFormik<ResetPasswordValues>({
    enableReinitialize: true,
    initialValues: {
      password: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      await handleResetPassword(values.password);
      router.push("/login");
    },
  });

  function capitalizeFirstLetter(val: string | undefined) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  function handleErrors(type: string) {
    if (type == "password") {
      return capitalizeFirstLetter(errors.password);
    }
  }

  return (
    <div className="mx-10">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center h-[calc(100vh-155px)]">
          {/* body */}
          <div className="flex flex-col justify-center items-center gap-7 bg-[#1a1a1a]/20 backdrop-blur-md p-12 border border-primary rounded-3xl w-160 h-fit">
            {/* 1 */}
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="text-primary text-4xl">RESET PASSWORD</div>
              {/* <div className="text-md text-zinc-400">Enter new password</div> */}
            </div>

            {/* 2 */}

            <div className="group flex flex-col justify-center items-end gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <FieldLabel htmlFor="password">
                  New Password<span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  type="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  aria-invalid={!!errors.password && !!touched.password}
                />
                {errors.password && touched.password && (
                  <FieldError>{handleErrors("password")}</FieldError>
                )}
              </div>
            </div>

            {/* 3 */}
            <div className="flex flex-col justify-center items-center gap-4 w-full">
              <div className="flex flex-col justify-center items-center gap-4 w-full">
                <Button
                  type="submit"
                  variant={"none"}
                  size={"none"}
                  disabled={!dirty || isReseting}
                  onClick={handleChange}
                  className="bg-primary hover:bg-secondary disabled:opacity-50 px-4 py-4 rounded-lg w-full font-extrabold text-center transition-colors duration-300 hover:cursor-pointer disabled:cursor-not-allowed"
                >
                  {isReseting ? (
                    <span className="flex justify-center items-center gap-2">
                      <Spinner data-icon="inline-start" />
                      UPDATING . . .
                    </span>
                  ) : (
                    "UPDATE PASSWORD"
                  )}
                </Button>
              </div>
            </div>
            {/* <div className="flex justify-center items-center gap-1 text-zinc-400 hover:text-primary transition-colors duration-300 hover:cursor-pointer">
              <IconArrowLeft className="size-" />
              <Link href="/register" className="">
                Back to login
              </Link>
            </div> */}
          </div>
        </div>
      </form>
    </div>
  );
}
