import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="mx-10">
      {/* body */}

      <div className="flex justify-center items-center h-[calc(100vh-155px)]">
        <div className="flex justify-between items-center gap-14 bg-[#1a1a1a]/20 backdrop-blur-md mx-20 p-6 border border-primary rounded-3xl">
          {/* Left */}

          <div className="flex flex-col justify-start gap-8 p-10 w-full">
            <div className="flex flex-col gap-5">
              <div className="font-extrabold text-4xl">
                GET IN <span className="text-primary">TOUCH</span>
              </div>

              <div className="text-zinc-400 text-lg">
                Have questions about our gear? Our experts are here to help!
              </div>
            </div>

            <div className="font-extrabold text-primary text-xl">
              CONTACT INFORMATION
            </div>
            <div className="flex flex-col gap-5">
              {/* 1 */}
              <div className="flex items-center gap-4">
                <div className="p-1.5 border border-primary rounded-lg">
                  <Phone className="size-5 text-primary" />
                </div>
                <div>+1 234 567 890</div>
              </div>
              {/* 2 */}
              <div className="flex items-center gap-4">
                <div className="p-1.5 border border-primary rounded-lg">
                  <Mail className="size-5 text-primary" />
                </div>
                <div>info@myshop.com</div>
              </div>
              {/* 3 */}
              <div className="flex items-center gap-4">
                <div className="p-1.5 border border-primary rounded-lg">
                  <MapPin className="size-5 text-primary" />
                </div>
                <div>123 Main Street, City, Country</div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-6 w-full">
            {/* 1 */}

            <div className="flex flex-col gap-4">
              <input
                className="px-4 py-3 border border-primary rounded-lg outline-none focus:ring-2 focus:ring-secondary w-full"
                type="text"
                placeholder="Full Name "
              />
              <input
                className="px-4 py-3 border border-primary rounded-lg outline-none focus:ring-2 focus:ring-secondary w-full"
                type="text"
                placeholder="Email Address"
              />
              <textarea
                className="px-4 py-3 border border-primary rounded-lg outline-none focus:ring-2 focus:ring-secondary w-full resize-none"
                placeholder="How can we help you?"
                rows={4}
              />
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-primary hover:bg-secondary px-4 py-8 rounded-lg text-white text-xl text-center transition-colors duration-300 hover:cursor-pointer">
                  SUBMIT
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="flex flex-col gap-6 bg-[#1a1a1a]/20 backdrop-blur-md p-6 border border-primary rounded-3xl">
                <AlertDialogHeader className="flex flex-col gap-4 w-full text-center">
                  <AlertDialogTitle className="flex flex-col w-full font-bold text-[16px] text-primary text-center">
                    THANK YOU FOR CONTACT US!
                  </AlertDialogTitle>

                  <AlertDialogDescription className="flex flex-col justify-center items-center gap-3 w-full text-font-primary font-bold text-center">
                    We appreciate you reaching out and will get back to you as
                    soon as possible.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogAction className="bg-primary hover:bg-secondary px-5 py-6 rounded-lg w-full text-white text-center transition-colors duration-300 hover:cursor-pointer">
                    CLOSE
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
