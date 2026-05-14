import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-10">
      {/* body */}

      <div className="my-50">
        <div className="flex justify-between items-center gap-14 bg-[#1a1a1a]/20 backdrop-blur-md mx-20 p-7 border border-[#F97A14] rounded-3xl">
          {/* Left */}

          <div className="flex flex-col justify-start gap-8 p-10 w-full">
            <div className="flex flex-col gap-5">
              <div className="font-extrabold text-4xl">
                GET IN <span className="text-[#F97A14]">TOUCH</span>
              </div>

              <div className="text-zinc-400 text-lg">
                Have questions about our gear? Our experts are here to help!
              </div>
            </div>

            <div className="font-extrabold text-[#F97A14] text-xl">
              CONTACT INFORMATION
            </div>
            <div className="flex flex-col gap-5">
              {/* 1 */}
              <div className="flex items-center gap-4">
                <div className="p-1.5 border border-[#F97A14] rounded-lg">
                  <Phone className="size-5 text-[#F97A14]" />
                </div>
                <div>+1 234 567 890</div>
              </div>
              {/* 2 */}
              <div className="flex items-center gap-4">
                <div className="p-1.5 border border-[#F97A14] rounded-lg">
                  <Mail className="size-5 text-[#F97A14]" />
                </div>
                <div>info@myshop.com</div>
              </div>
              {/* 3 */}
              <div className="flex items-center gap-4">
                <div className="p-1.5 border border-[#F97A14] rounded-lg">
                  <MapPin className="size-5 text-[#F97A14]" />
                </div>
                <div>123 Main Street, City, Country</div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-10 w-full">
            {/* 1 */}

            <div className="flex flex-col gap-4">
              <input
                className="px-4 py-3 border border-[#F97A14] rounded-lg outline-none focus:ring-[#F97A14] focus:ring-2 w-full"
                type="text"
                placeholder="Full Name "
              />
              <input
                className="px-4 py-3 border border-[#F97A14] rounded-lg outline-none focus:ring-[#F97A14] focus:ring-2 w-full"
                type="text"
                placeholder="Email Address"
              />
              <textarea
                className="px-4 py-3 border border-[#F97A14] rounded-lg outline-none focus:ring-[#F97A14] focus:ring-2 w-full resize-none"
                placeholder="How can we help you?"
                rows={4}
              />
            </div>

            {/* 3 */}
            <button className="bg-[#F97A14] hover:bg-[#F95A20] px-4 py-4 rounded-lg text-white text-center transition-colors duration-300 hover:cursor-pointer">
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
