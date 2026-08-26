import HomePage from "@/features/home/HomePage";
import { supabase } from "@/lib/supabase";

const home = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default home;
