import React from "react";
// import { useMutation } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import supabase from "../config/supabaseClient";

type User = {
  email: string;
  password: string;
  name: string;
};

function SignupForm() {
  const {
    register,
    reset,
    formState,
    formState: { errors },
    handleSubmit,
  } = useForm<User>();
  const onSubmit: SubmitHandler<User> = data => createUser(data);

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ email: "", password: "" });
    }
  }, [formState, reset]);

  const createUser = async (user: User) => {
    const { data: userWithEmail } = await supabase
      .from("users")
      .select("*")
      .eq("email", user.email)
      .single();

    if (userWithEmail) {
      throw new Error("User with email exists");
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

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" aria-invalid={errors.email ? "true" : "false"}>
          email:
        </label>
        <input {...register("email", { required: true })} />
        {errors.email && <p role="alert">{errors.email?.message}</p>}
        {errors.email && "email is required"}
        <label htmlFor="password">password:</label>
        <input {...register("password", { required: true, minLength: 6 })} />
        {errors.password && "password is required"}
        <button type="submit">send</button>
      </form>
    </div>
  );
}

export default SignupForm;
