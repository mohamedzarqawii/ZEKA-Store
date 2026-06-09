"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, currentUser } = useAuth();
  const router = useRouter();

  function handleLogin() {
    login(email, password);

    router.push("/profile");
  }

  return (
    <div className="mx-10">
      <div className="flex justify-center items-center h-[calc(100vh-155px)]">
        {/* body */}
        <div className="flex flex-col justify-center items-center gap-7 bg-[#1a1a1a]/20 backdrop-blur-md p-12 border border-primary rounded-3xl w-130 h-fit">
          {/* 1 */}
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="text-primary text-4xl">WELCOME BACK</div>
            <div className="text-md text-zinc-400">
              Login to access your performance data
            </div>
          </div>

          {/* 2 */}

          <div className="group flex flex-col justify-center items-end gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 border border-primary rounded-lg outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-3 border border-primary rounded-lg outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
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
              className="bg-primary hover:bg-secondary px-4 py-4 rounded-lg w-full font-extrabold text-center transition-colors duration-300 hover:cursor-pointer"
              onClick={handleLogin}
            >
              LOG IN
            </button>

            <div>
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:text-secondary transition-colors duration-300"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
