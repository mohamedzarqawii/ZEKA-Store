import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-10">
      <div className="flex justify-center items-center h-[calc(100vh-155px)]">
        {/* body */}
        <div className="flex flex-col justify-center items-center gap-8 bg-[#1a1a1a]/20 backdrop-blur-md p-12 border border-primary rounded-3xl w-135 h-fit">
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
                <label>First Name</label>
                <input
                  type="email"
                  className="px-4 py-3 border border-primary rounded-lg outline-none focus:ring-2 focus:ring-secondary w-full"
                />
              </div>
              <div className="flex flex-col flex-1 gap-2">
                <label>Last Name</label>
                <input
                  type="password"
                  className="px-4 py-3 border border-primary rounded-lg outline-none focus:ring-2 focus:ring-secondary w-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="px-4 py-3 border border-primary rounded-lg outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="px-4 py-3 border border-primary rounded-lg outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>

          {/* 3 */}
          <div className="flex flex-col justify-center items-center gap-4 w-full">
            <button className="bg-primary hover:bg-secondary px-4 py-4 rounded-lg w-full font-extrabold text-center transition-colors duration-300 hover:cursor-pointer">
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
        </div>
      </div>
    </div>
  );
}
