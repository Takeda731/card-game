import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://klnmvjgbllykljfurdwv.supabase.co";

const supabaseKey =
  "ТВОЙ_КЛЮЧ";

export const supabase =
  createClient(
    supabaseUrl,
    supabaseKey
  );