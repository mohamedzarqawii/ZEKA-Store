"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [buttonText, setButtonText] = useState("SUBMIT");
  const [isAlertOpen, setIsAlertOpen] = useState(false); // التحكم في ظهور الـ Popup عند النجاح

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formRef.current) return;

    setButtonText("SENDING...");

    const serviceID = "default_service";
    const templateID = "template_bp2hz3o";
    const publicKey = "AOq4bhkAry0qF8tdT";

    emailjs
      .sendForm(serviceID, templateID, formRef.current, publicKey)
      .then(() => {
        setButtonText("SUBMIT");
        setIsAlertOpen(true);
        formRef.current?.reset();
      })
      .catch((err) => {
        setButtonText("SUBMIT");
        alert("Error sending email: " + JSON.stringify(err));
      });
  };

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

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full"
          >
            <div className="flex flex-col gap-4">
              <input
                className="bg-transparent px-4 py-3 border border-primary rounded-lg outline-none focus:ring-2 focus:ring-secondary w-full text-white"
                type="text"
                name="name"
                placeholder="Full Name "
                required
              />

              <input
                className="bg-transparent px-4 py-3 border border-primary rounded-lg outline-none focus:ring-2 focus:ring-secondary w-full text-white"
                type="email"
                name="email"
                placeholder="Email Address"
                required
              />

              <textarea
                className="bg-transparent px-4 py-3 border border-primary rounded-lg outline-none focus:ring-2 focus:ring-secondary w-full text-white resize-none"
                name="message"
                placeholder="How can we help you?"
                rows={4}
                required
              />
            </div>

            <Button
              type="submit"
              className="bg-primary hover:bg-secondary px-4 py-8 rounded-lg w-full text-white text-xl text-center transition-colors duration-300 hover:cursor-pointer"
            >
              {buttonText}
            </Button>

            {/* الـ AlertDialog يفتح فقط عندما تصبح قيمة isAlertOpen تساوي true */}
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
              <AlertDialogContent className="flex flex-col gap-6 bg-[#1a1a1a]/90 backdrop-blur-md p-6 border border-primary rounded-3xl">
                <AlertDialogHeader className="flex flex-col gap-4 w-full text-center">
                  <AlertDialogTitle className="flex flex-col w-full font-bold text-[16px] text-primary text-center">
                    THANK YOU FOR CONTACTING US!
                  </AlertDialogTitle>

                  <AlertDialogDescription className="flex flex-col justify-center items-center gap-3 w-full font-bold text-zinc-300 text-center">
                    We appreciate you reaching out and will get back to you as
                    soon as possible.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogAction
                    onClick={() => setIsAlertOpen(false)}
                    className="bg-primary hover:bg-secondary px-5 py-6 rounded-lg w-full text-white text-center transition-colors duration-300 hover:cursor-pointer"
                  >
                    CLOSE
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        </div>
      </div>
    </div>
  );
}
