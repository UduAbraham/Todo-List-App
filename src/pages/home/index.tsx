import { Button } from "@heroui/react";
import { Link } from "react-router-dom";


export default function HomePage () {

    return (
        <div className=" flex gap-4 space-y-4 p-10 items-center justify-between">
            <h2 className="text-xl font-bold "> Home Page</h2>
            <Button as={Link} to={"/signup"}> View Sign Up</Button>
           </div>
    )
}