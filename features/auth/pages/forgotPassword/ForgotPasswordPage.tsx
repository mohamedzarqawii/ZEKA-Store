"use client";

import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

import { useFormik } from "formik";
import { forgotPasswordSchema } from "@/types/auth/forgotPassword";
import { useForgotPassword, useGetCurrentUser } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldError, FieldLabel } from "@/components/ui/field";
import { useEffect, useState } from "react";

const TIMER_KEY = "reset_password_cooldown_expiry";
const COOLDOWN_DURATION = 61;

const ForgotPasswordPage = () => {
  const { mutateAsync: handleForgotPassword, isPending: isEmailSending } =
    useForgotPassword();

  const [cooldown, setCooldown] = useState<number>(0);

  useEffect(() => {
    const savedExpiry = localStorage.getItem(TIMER_KEY);
    if (savedExpiry) {
      const remainingTime = Math.ceil(
        (parseInt(savedExpiry, 10) - Date.now()) / 1000,
      );
      if (remainingTime > 0) {
        setCooldown(remainingTime);
      } else {
        localStorage.removeItem(TIMER_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          localStorage.removeItem(TIMER_KEY);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const startCooldown = () => {
    const expiryTime = Date.now() + COOLDOWN_DURATION * 1000;
    localStorage.setItem(TIMER_KEY, expiryTime.toString());
    setCooldown(COOLDOWN_DURATION);
  };

  type ForgotPasswordValues = {
    email: string;
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
  } = useFormik<ForgotPasswordValues>({
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      await handleForgotPassword(values);
      startCooldown();
    },
  });

  function capitalizeFirstLetter(val: string | undefined) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  function handleErrors(type: string) {
    if (type == "email") {
      return capitalizeFirstLetter(errors.email);
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
              <div className="text-primary text-4xl">FORGOT PASSWORD</div>
              <div className="text-md text-zinc-400">
                Enter your email and we'll send you a recovery link.
              </div>
            </div>

            {/* 2 */}

            <div className="group flex flex-col justify-center items-end gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <FieldLabel htmlFor="email">
                  Email<span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  type="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email && !!touched.email}
                />
                {errors.email && touched.email && (
                  <FieldError>{handleErrors("email")}</FieldError>
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
                  disabled={!dirty || isEmailSending || cooldown > 0}
                  onClick={handleChange}
                  className="bg-primary hover:bg-secondary disabled:opacity-50 px-4 py-4 rounded-lg w-full font-extrabold text-center transition-colors duration-300 hover:cursor-pointer disabled:cursor-not-allowed"
                >
                  {cooldown > 0
                    ? `RESEND IN ${cooldown} Second`
                    : "SEND RECOVERY EMAIL"}
                </Button>
              </div>
            </div>
            <div className="flex justify-center items-center gap-1 text-zinc-400 hover:text-primary transition-colors duration-300 hover:cursor-pointer">
              <IconArrowLeft className="size-" />
              <Link href="/register" className="">
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ForgotPasswordPage;
