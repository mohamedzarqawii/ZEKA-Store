import { IconArrowLeft, IconLockOpen2 } from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-10">
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="px-4 py-3 border border-primary rounded-lg outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>

          {/* 3 */}
          <div className="flex flex-col justify-center items-center gap-4 w-full">
            <button className="bg-primary hover:bg-secondary px-4 py-4 rounded-lg w-full font-extrabold text-center transition-colors duration-300 hover:cursor-pointer">
              SEND RECOVERY EMAIL
            </button>
          </div>
          <div className="flex justify-center items-center gap-1 text-zinc-400 hover:text-primary transition-colors duration-300 hover:cursor-pointer">
            <IconArrowLeft className="size-" />
            <Link href="/register" className="">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
