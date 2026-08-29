"use server";

import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function deleteAccount() {
  const cookieStore = await cookies();

  // 1. إنشاء Server Client للتحقق من الجلسة
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {}
        },
      },
    },
  );

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Unauthorized: User not logged in.");
  }

  // 3. إنشاء Admin Client باستخدام الـ Service Role Key
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!, // أو SUPABASE_SERVICE_ROLE_KEY
  );

  // 4. حذف المستخدم نهائياً من Supabase Auth
  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
    user.id,
  );

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  // 5. تسحيل الخروج وتدمير الـ Session
  await supabase.auth.signOut();

  return { success: true };
}
