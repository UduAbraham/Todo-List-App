import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignUppayload } from "./component/auth.type";
import { SignUpSchema } from "./component/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { SignUpApi } from "../auth/Api/auth.api";
import { useNavigate } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

export default function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUppayload>({
    resolver: yupResolver(SignUpSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: SignUpApi,
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  const onSubmit: SubmitHandler<SignUppayload> = (data) => {
    mutate(data);
  };

  // ✅ Visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ Strength Meter state
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&#]/.test(password)) score++;
    setPasswordStrength(score);
  };

  return (
    <div className="space-y-4 shadow-2xl py-10 max-w-xl mx-auto my-10 rounded-2xl">
      <div className="justify-center max-w-md mx-auto">

        <div className="flex justify-center gap-2 items-center py-3">
          <FaRegCheckCircle className="text-blue-600" size={18} />
          <p className="font-semibold">TaskFlow</p>
        </div>

        <h2 className="text-2xl font-bold text-center">Create Your Account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* ✅ Email */}
          <div>
            <Input
              {...register("email")}
              type="email"
              label="Email"
              labelPlacement="outside"
              placeholder="name@example.com"
              endContent={<MdOutlineEmail size={20} />}
              className="py-5"
            />
            {errors.email && (
              <p className="text-red-500 text-sm pt-1">{errors.email.message}</p>
            )}
          </div>

          {/* ✅ PASSWORD with Strength Meter */}
          <div>
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              label="Password"
              labelPlacement="outside"
              placeholder="Enter your password"
              className="py-5"
              onChange={(e) => checkStrength(e.target.value)}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <FaRegEye className="text-xl text-default-400" />
                  ) : (
                    <FaRegEyeSlash className="text-xl text-default-400" />
                  )}
                </button>
              }
            />
            {errors.password && (
              <p className="text-red-500 text-sm pt-1">{errors.password.message}</p>
            )}

            {/* ✅ Password Strength Indicator */}
            <div className="flex items-center justify-between px-1 pt-2">
              <div className="w-full bg-gray-300 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    passwordStrength <= 2
                      ? "bg-red-500 w-1/4"
                      : passwordStrength === 3
                      ? "bg-yellow-500 w-2/4"
                      : passwordStrength === 4
                      ? "bg-blue-500 w-3/4"
                      : "bg-green-500 w-full"
                  }`}
                ></div>
              </div>
              <span className="text-xs ml-2">
                {passwordStrength <= 2
                  ? "Weak"
                  : passwordStrength === 3
                  ? "Medium"
                  : passwordStrength === 4
                  ? "Strong"
                  : "Very Strong"}
              </span>
            </div>
          </div>

          {/* ✅ Confirm Password */}
          <div>
            <Input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              labelPlacement="outside"
              placeholder="Confirm your password"
              className="py-5"
              endContent={
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <FaRegEye className="text-xl text-default-400" />
                  ) : (
                    <FaRegEyeSlash className="text-xl text-default-400" />
                  )}
                </button>
              }
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm pt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* ✅ Submit */}
          <Button
            color="primary"
            type="submit"
            className="w-full rounded-3xl my-3"
            isLoading={isPending}
          >
            {isPending ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>

        <div className="flex justify-center items-center gap-2">
          <p>Already have an account?</p>
          <button
            className="text-blue-600 font-semibold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
