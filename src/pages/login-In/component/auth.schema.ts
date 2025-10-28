
import * as yup from "yup";

export const LoginSchema = yup.object({
    username: yup.string().required("username is requred"),
    password:
   yup.string().required("Password is required")
   .min(8,"password must be at least 8 characters")
})