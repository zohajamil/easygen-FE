import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../lib/hooks/validation/useSignupForm";
import { z } from "zod";
import { CustomInput } from "../components/ui/CustomInput";
import useAxiosHandler from "../lib/hooks/axios/useAxiosHandler";
import { CustomButton } from "../components/ui/CustomButton";
import { IAuthenticatedUserResponse } from "../lib/interfaces/authenticatedUserResponse";

export default function SignUp() {
  type SignupFormInputs = z.infer<typeof SignUpSchema>;

  const useSignUpForm = () => {
    return useForm<SignupFormInputs>({
      resolver: zodResolver(SignUpSchema),

      defaultValues: {
        name: "",
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
  } = useSignUpForm();

  const navigate = useNavigate();
  const { sendRequest } = useAxiosHandler<IAuthenticatedUserResponse>();

  const submitSignupForm: SubmitHandler<SignupFormInputs> = async () => {
    const signUpPayload = {
      ...getValues(),
      name: getValues("name").trim(),
    };
    const data = await sendRequest("users", "POST", signUpPayload);
    console.log(data);
    if (data) {
      localStorage.setItem("sessionId", data.sessionId);
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-teal-800 p-4">
      <form
        className="bg-teal-400 p-8 rounded-lg shadow-xl max-w-sm w-full space-y-6"
        onSubmit={handleSubmit(submitSignupForm)}
      >
        <h2 className="text-3xl font-semibold text-gray-700 text-center mb-6">
          Sign Up
        </h2>

        <CustomInput
          label="Name"
          type="text"
          placeholder="Your name"
          {...register("name")}
          error={errors.name?.message}
        />
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

        <CustomButton label="Create an Account" type="submit" />

        <div className="text-center text-sm text-teal-700">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}
