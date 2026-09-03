"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/types/auth/login";
import { useFormik } from "formik";
import { useGetCurrentUser, useLogin } from "../hooks/useAuth";

const LoginPage = () => {
  const { mutate: handleLogin, isPending: isLogin } = useLogin();
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();

  const { values, errors, dirty, touched, handleSubmit, handleChange } =
    useFormik({
      initialValues: {
        enableReinitialize: true,
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        await handleLogin(values);
      },
    });

  // if (isCurrentUserLoading) {
  //   return (
  //     <div className="flex justify-center items-center gap-2 h-[calc(100vh-155px)] text-primary text-4xl">
  //       <Spinner className="size-8" data-icon="inline-start" />
  //       Loading . . .
  //     </div>
  //   );
  // }

  if (currentUser) return null;

  return (
    <div className="mx-10">
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
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
            <Input
              name="email"
              type="email"
              label="Email"
              isRequired={true}
              errors={errors}
              touched={touched}
              value={values.email}
              onChange={handleChange}
              aria-invalid={!!errors.email && !!touched.email}
            />

            {/* ----------------------------------------------------- */}
            <div className="flex flex-col gap-2 w-full"></div>

            <Input
              name="password"
              type="password"
              label="Password"
              isRequired={true}
              errors={errors}
              touched={touched}
              value={values.password}
              onChange={handleChange}
              aria-invalid={!!errors.password && !!touched.password}
            />

            <Link
              href="/forgotPassword"
              className="text-primary hover:text-secondary text-xs"
            >
              Forgot password?
            </Link>
          </div>

          {/* 3 */}
          <div className="flex flex-col justify-center items-center gap-4 w-full">
            <Button
              variant={"none"}
              size={"none"}
              disabled={!dirty || isLogin}
              isLoading={isLogin}
              loadingText="Wait . . ."
              type="submit"
              className="bg-primary hover:bg-secondary px-4! py-4! rounded-lg w-full h-15 text-center hover:cursor-pointer"
            >
              LOG IN
            </Button>

            <div>
              Don't have an account?{" "}
              <Link
                href="/signup"
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
