"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { useEffect } from "react";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { loginSchema } from "@/types/auth/login";
import { useGetCurrentUser, useLogin } from "../hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";

const LoginPage = () => {
  const { mutate: handleLogin, isPending: isLogin } = useLogin();
  const { data: currentUser, isLoading } = useGetCurrentUser();

  const router = useRouter();

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const { values, errors, dirty, touched, handleSubmit, handleChange } =
    loginFormik;

  useEffect(() => {
    if (currentUser) {
      router.replace("/profile");
    }
  }, [currentUser, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-155px)] text-primary">
        Loading...
      </div>
    );
  }

  // 2. إذا كان مسجلاً دخول، لا ترجع شيء (سيتم التوجيه عبر useEffect)
  if (currentUser) return null;

  return (
    <div className="mx-10">
      <div className="flex justify-center items-center h-[calc(100vh-155px)]">
        {/* body */}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-7 bg-[#1a1a1a]/20 backdrop-blur-md p-12 border border-primary rounded-3xl w-130 h-fit"
          noValidate
        >
          {/* 1 */}
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="text-primary text-4xl">WELCOME BACK</div>

            <div className="text-md text-zinc-400">
              Login to access your performance data
            </div>
          </div>

          {/* 2 */}

          <div className="group flex flex-col justify-center items-end gap-4 w-full">
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
                <FieldError>{errors.email}</FieldError>
              )}
            </Field>

            {/* ----------------------------------------------------- */}
            <div className="flex flex-col gap-2 w-full"></div>

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
                <FieldError>{errors.password}</FieldError>
              )}
            </Field>

            <Link
              href="/forgotPassword"
              className="text-primary hover:text-secondary text-xs"
            >
              Forgot password?
            </Link>
          </div>

          {/* 3 */}
          <div className="flex flex-col justify-center items-center gap-4 w-full">
            <button
              disabled={!dirty || isLogin}
              type="submit"
              className="bg-primary hover:bg-secondary px-4 py-4 rounded-lg w-full font-extrabold text-center transition-colors duration-300 hover:cursor-pointer"
            >
              {isLogin ? (
                <span className="flex justify-center items-center gap-2">
                  <Spinner data-icon="inline-start" />
                  wait..
                </span>
              ) : (
                "LOG IN"
              )}
            </button>

            <div>
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:text-secondary transition-colors duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
