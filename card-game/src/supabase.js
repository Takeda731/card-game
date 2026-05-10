import { createClient }
from "@supabase/supabase-js";

const supabaseUrl =
  "https://klnmvjgbllykljfurdwv.supabase.co";

const supabaseKey =
  "sb_publishable_1LSHWlG3i_kQpLBu4YomMw__ohT7gMI";

export const supabase =
  createClient(
    supabaseUrl,
    supabaseKey
  );