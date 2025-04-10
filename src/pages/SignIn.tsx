import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CustomInput } from "../components/ui/CustomInput";
import useAxiosHandler from "../lib/hooks/axios/useAxiosHandler";
import { CustomButton } from "../components/ui/CustomButton";
import { SignInSchema } from "../lib/hooks/validation/useSignInForm";
import { IAuthenticatedUserResponse } from "../lib/interfaces/authenticatedUserResponse";

export default function SignIn() {
  type SigninFormInputs = z.infer<typeof SignInSchema>;

  const useSignInForm = () => {
    return useForm<SigninFormInputs>({
      resolver: zodResolver(SignInSchema),

      defaultValues: {
        email: "",
        password: "",
      },
    });
  };

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useSignInForm();

  const navigate = useNavigate();
  const { sendRequest } = useAxiosHandler<IAuthenticatedUserResponse>();

  const submitSigninForm: SubmitHandler<SigninFormInputs> = async () => {
    const signInPayload = {
      ...getValues(),
    };
    const data = await sendRequest("users/authenticate", "POST", signInPayload);
    if (data) {
      localStorage.setItem("sessionId", data.sessionId);
      navigate("/app");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-teal-800 p-4">
      <form
        className="bg-teal-400 p-8 rounded-lg shadow-xl max-w-sm w-full space-y-6"
        onSubmit={handleSubmit(submitSigninForm)}
      >
        <h2 className="text-3xl font-semibold text-gray-700 text-center mb-6">
          Sign In
        </h2>

        <CustomInput
          label="Email"
          type="email"
          placeholder="Your email"
          {...register("email")}
          error={errors.email?.message}
        />
        <CustomInput
          label="Password"
          type="password"
          placeholder="Your password"
          {...register("password")}
          error={errors.password?.message}
        />

        <CustomButton label="Login" type="submit" />

        <div className="text-center text-sm text-teal-700">
          Dont have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Register
          </a>
        </div>
      </form>
    </div>
  );
}
