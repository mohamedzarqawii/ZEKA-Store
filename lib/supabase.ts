import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
console.log("SUPABASE URL:", supabaseUrl);
console.log("SUPABASE KEY:", supabaseKey ? "EXISTS" : "MISSING");
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase environment variables. Check your .env.local file.",
  );
}

export const supabase = createBrowserClient(supabaseUrl, supabaseKey);
