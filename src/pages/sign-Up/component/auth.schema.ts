 import * as yup from "yup";

 export const SignUpSchema = yup.object({
    email: yup.string().required("Email is required").email("Invalid email"),
     password: yup
    .string()
    .required("Password is required")
    .min(8, "Must be at least 8 characters")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/[a-z]/, "Must include at least one lowercase letter")
    .matches(/\d/, "Must include at least one number")
    .matches(/[@$!%*?&#]/, "Must include at least one special character"),

   confirmPassword: yup
  .string()
  .oneOf([yup.ref("password")], "Passwords must match")
  .required("Confirm password is required"),
 })