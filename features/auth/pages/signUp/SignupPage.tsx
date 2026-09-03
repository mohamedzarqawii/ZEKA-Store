"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useGetCurrentUser, useSignUp } from "../hooks/useAuth";

const SignUpPage = () => {
  const router = useRouter();
  const { data: currentUser, isLoading } = useGetCurrentUser();
  const { mutate: handleSignUp, isPending: isSignUp } = useSignUp();

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
      handleSignUp(values);
    },
  });

  const { values, errors, dirty, touched, handleSubmit, handleChange } =
    signupFormik;

  // -----------------------

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
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
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
                <Input
                  name="firstName"
                  type="text"
                  label="First Name"
                  isRequired={true}
                  errors={errors}
                  touched={touched}
                  value={values.firstName}
                  onChange={handleChange}
                  aria-invalid={!!errors.firstName && !!touched.firstName}
                />
              </div>

              <div className="flex flex-col flex-1 gap-2">
                <Input
                  name="lastName"
                  type="text"
                  label="Last Name"
                  isRequired={false}
                  errors={errors}
                  touched={touched}
                  value={values.lastName}
                  onChange={handleChange}
                  aria-invalid={!!errors.lastName && !!touched.lastName}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
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
            </div>

            <div className="flex flex-col gap-2 w-full">
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
            </div>
          </div>

          {/* 3 */}
          <div className="flex flex-col justify-center items-center gap-4 w-full">
            <Button
              type="submit"
              isLoading={isSignUp}
              loadingText="Registering . . ."
              disabled={!dirty || isSignUp}
              className="bg-primary hover:bg-secondary px-4 py-4 rounded-lg w-full h-15 text-center"
            >
              CREATE ACCOUNT
            </Button>
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
};
export default SignUpPage;
