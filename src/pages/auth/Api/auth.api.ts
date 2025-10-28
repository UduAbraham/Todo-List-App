
import { SignUppayload } from "@/pages/sign-Up/component/auth.type";
import axios from 'axios';


 export const SignUpApi = async (payload:SignUppayload) => {
    const response = await axios.post("https://dummyjson.com/auth/signup",payload);

    return response;
}