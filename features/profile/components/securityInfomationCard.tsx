import { Button } from "@/components/ui/button";
import {
  useForgotPassword,
  useGetCurrentUser,
} from "@/features/auth/pages/hooks/useAuth";
import { forgotPasswordSchema } from "@/types/auth/forgotPassword";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

const TIMER_KEY = "reset_password_cooldown_expiry";
const COOLDOWN_DURATION = 60;

const SecurityInformationCard = () => {
  const { data: currentUser } = useGetCurrentUser();
  const { mutateAsync: handleForgotPassword, isPending: isEmailSending } =
    useForgotPassword();

  const [cooldown, setCooldown] = useState<number>(0);

  useEffect(() => {
    const savedExpiry = localStorage.getItem(TIMER_KEY);
    if (savedExpiry) {
      const remainingTime = Math.ceil(
        (parseInt(savedExpiry, 10) - Date.now()) / 1000,
      );
      if (remainingTime > 0) {
        setCooldown(remainingTime);
      } else {
        localStorage.removeItem(TIMER_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          localStorage.removeItem(TIMER_KEY);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  // 3. بدء الـ Cooldown وحفظ وقت الانتهاء المستقبلي
  const startCooldown = () => {
    const expiryTime = Date.now() + COOLDOWN_DURATION * 1000;
    localStorage.setItem(TIMER_KEY, expiryTime.toString());
    setCooldown(COOLDOWN_DURATION);
  };

  type ForgotPasswordValues = {
    email: string;
  };

  const { handleSubmit } = useFormik<ForgotPasswordValues>({
    enableReinitialize: true,
    initialValues: {
      email: String(currentUser?.email || ""),
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      await handleForgotPassword(values);
      startCooldown();
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between items-center bg-[#1a1a1a]/20 backdrop-blur-md mt-6 px-8 py-10 border border-primary rounded-3xl w-full h-fit">
        <div className="flex flex-col gap-2">
          <div className="text-primary text-xl">Reset Password</div>
          <div className="text-muted-foreground text-xs">
            We will send a reset link to your email address
          </div>
        </div>

        <Button
          type="submit"
          variant="default"
          isPending={isEmailSending}
          pendingText="Sending reset link"
          disabled={isEmailSending || cooldown > 0}
          className="justify-start p-6 rounded-lg outline-none text-md"
        >
          {cooldown > 0 ? `Resend link in ${cooldown}s` : "Send Reset Link"}
        </Button>
      </div>
    </form>
  );
};

export default SecurityInformationCard;
