
import { LoginPayLoad } from "../schema/auth.type";
import axios from 'axios';

const LoginApi = async (payload:LoginPayLoad) =>{

    const response = await axios.post("https://dummyjson.com/auth/login",payload);

    return  response;
}

export {LoginApi};