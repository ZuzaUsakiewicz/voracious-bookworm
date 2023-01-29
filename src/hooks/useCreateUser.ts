import { useMutation } from "react-query";
import supabase from "../config/supabaseClient";

type User = {
  email: string;
  password: string;
  name: string;
};

const createUser = async (user: User) => {
  const { data: userWithEmail } = await supabase
    .from("users")
    .select("*")
    .eq("email", user.email)
    .single();

  if (userWithEmail) {
    throw new Error("User with username exists");
  }

  const { data, error: signUpError } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  });

  if (signUpError) {
    throw signUpError;
  }

  return data;
};

export default function useCreateUser(user: User) {
  return useMutation(() => createUser(user), {
    onSuccess: async data => {
      const { data: insertData, error: insertError } = await supabase
        .from("users")
        .insert({
          name: user.name,
          username: user.email,
          id: data.user?.id,
        });

      if (insertError) {
        throw insertError;
      }

      return insertData;
    },
  });
}
