"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

export default function Home() {
  const router = useRouter();
  const { handleSignUp, currentUser } = useAuth();

  const signupFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required(),
      lastName: yup.string(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
    }),
    onSubmit: (values) => {
      handleSignUp(
        values.firstName,
        values.lastName,
        values.email,
        values.password,
      );
    },
  });

  const { values, errors, touched, handleSubmit, handleChange } = signupFormik;

  // -----------------------

  useEffect(() => {
    if (currentUser) {
      router.replace("/profile");
    }
  }, [currentUser, router]);

  if (currentUser) return null;

  // -----------------------

  function capitalizeFirstLetter(val: string | undefined) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  function handleErrors(type: string) {
    if (type == "email") {
      return capitalizeFirstLetter(errors.email);
    } else if (type == "password") {
      return capitalizeFirstLetter(errors.password);
    } else if (type == "firstName") {
      return capitalizeFirstLetter(errors.firstName);
    } else if (type == "lastName") {
      return capitalizeFirstLetter(errors.lastName);
    }
  }

  return (
    <div className="mx-10">
      <div className="flex justify-center items-center h-[calc(100vh-155px)]">
        {/* body */}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-8 bg-[#1a1a1a]/20 backdrop-blur-md p-12 border border-primary rounded-3xl w-135 h-fit"
        >
          {/* 1 */}
          <div className="flex flex-col justify-center items-center gap-4 w-full">
            <div className="text-primary text-4xl">JOIN THE ELITE</div>
            <div className="text-md text-zinc-400">
              Create your account to start your journey!
            </div>
          </div>

          {/* 2 */}

          <div className="flex flex-col justify-center items-end gap-4 w-full">
            <div className="flex gap-4 w-full">
              <div className="flex flex-col flex-1 gap-2">
                <Field>
                  <FieldLabel htmlFor="name">
                    First Name<span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    name="firstName"
                    type="text"
                    value={values.firstName}
                    onChange={handleChange}
                    aria-invalid={!!errors.firstName && !!touched.firstName}
                  />
                  {errors.firstName && touched.firstName && (
                    <FieldError>{handleErrors("firstName")}</FieldError>
                  )}
                </Field>
              </div>

              <div className="flex flex-col flex-1 gap-2">
                <Field>
                  <FieldLabel htmlFor="name">Last Name</FieldLabel>
                  <Input
                    name="lastName"
                    type="text"
                    value={values.lastName}
                    onChange={handleChange}
                    aria-invalid={!!errors.lastName && !!touched.lastName}
                  />
                  {errors.lastName && touched.lastName && (
                    <FieldError>{handleErrors("lastName")}</FieldError>
                  )}
                </Field>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Field>
                <FieldLabel htmlFor="name">
                  Email<span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email && !!touched.email}
                />
                {errors.email && touched.email && (
                  <FieldError>{handleErrors("email")}</FieldError>
                )}
              </Field>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Field>
                <FieldLabel htmlFor="name">
                  Password<span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  aria-invalid={!!errors.password && !!touched.password}
                />
                {errors.password && touched.password && (
                  <FieldError>{handleErrors("password")}</FieldError>
                )}
              </Field>
            </div>
          </div>

          {/* 3 */}
          <div className="flex flex-col justify-center items-center gap-4 w-full">
            <button
              className="bg-primary hover:bg-secondary px-4 py-4 rounded-lg w-full font-extrabold text-center transition-colors duration-300 hover:cursor-pointer"
              type="submit"
            >
              CREATE ACCOUNT
            </button>
            <div>
              Already a member?{" "}
              <Link
                href="/login"
                className="text-primary hover:text-secondary transition-colors duration-300"
              >
                Log In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
