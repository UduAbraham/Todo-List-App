import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa"
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { LoginSchema } from "../login-In/component/auth.schema";
import { LoginPayLoad } from "../login-In/component/auth.type";
import { LoginApi } from "../auth/Api/auth.type";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isVisible, setVisible] = useState<boolean>(false);
  const toggleVisibility = () => setVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayLoad>({ resolver: yupResolver(LoginSchema) });

  const { mutate, isPending } = useMutation({
    mutationFn: LoginApi,
    onSuccess: (data) => {
      console.log(data?.data);
      navigate("/dashboard");
    },
    onError: (error) => console.error(error),
  });

  const onSubmit: SubmitHandler<LoginPayLoad> = (data) => mutate(data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-xl  w-full max-w-md p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            
              <FiCheckCircle  className="h-6 w-6 text-blue-600"/>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 text-sm  font-semibold">
            Sign in to continue to your dashboard.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <Input
              {...register("username")}
              placeholder="Enter your email"
              type="email"
              radius="lg"
            />
            {errors.username && (
              <p className="text-red-500 text-sm pt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              {...register("password")}
              placeholder="Enter your password"
              radius="lg"
              type={isVisible ? "text" : "password"}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  type="button"
                  onClick={toggleVisibility}
                  className="focus:outline-none"
                >
                  {isVisible ? (
                    <FaRegEye className="text-xl text-gray-400" />
                  ) : (
                    <FaRegEyeSlash className="text-xl text-gray-400" />
                  )}
                </button>
              }
            />
            {errors.password && (
              <p className="text-red-500 text-sm pt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            fullWidth
            className="bg-blue-600 text-white py-6 font-medium"
            size="lg"
            isLoading={isPending}
          >
            {isPending ? "Logging in..." : "Sign In"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center space-x-2">
          <span className="h-px w-1/5 bg-gray-300"></span>
          <span className="text-gray-400 text-sm">OR CONTINUE WITH</span>
          <span className="h-px w-1/5 bg-gray-300"></span>
        </div>

        {/* Social Buttons */}
        <div className="flex gap-4">
          <Button
            variant="bordered"
            fullWidth
            className="flex items-center justify-center gap-2 border-gray-300"
          >
            <FcGoogle size={20} />
            Google
          </Button>
          <Button
            variant="bordered"
            fullWidth
            className="flex items-center justify-center gap-2 border-gray-300"
          >
            <FaMicrosoft size={20} className="text-blue-600" />
            Microsoft
          </Button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm">
          Don’t have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
