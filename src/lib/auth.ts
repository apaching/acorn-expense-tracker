import { supabase } from "@/lib/supabaseClient";

export async function signUpWithEmail(
  name: string,
  email: string,
  password: string
) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) throw error;

  return data;
}
