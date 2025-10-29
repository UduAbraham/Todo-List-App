import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { GiFireFlower } from "react-icons/gi";
import { BsSun } from "react-icons/bs";
import { MdWork } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "@heroui/react";
import { FiPlus } from "react-icons/fi";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  const sidebarLinks = [
    { icon:  <BsSun  className="text-blue-500"/>, title: "Today", url: "/dashboard/today" },
   { icon: <MdWork className="text-green-500" />, title: "Work", url: "/dashboard/work" },
  { icon: <FaUserAlt className="text-purple-500" />, title: "Personal", url: "/dashboard/personal" },
  { icon: <FaShoppingCart className="text-orange-500" />, title: "Shopping List", url: "/dashboard/shoppinglist" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* ✅ Mobile Menu Button */}
      
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden p-3 fixed top-4 left-4 z-50 bg-white shadow-md rounded-md"
      >
        {open ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
      </button>

      {/* ✅ Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full p-6 bg-gray-100 shadow-md
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:w-64
        `}
      >
        <div className="flex items-center gap-2 py-3">
         <GiFireFlower  className="text-blue-500"/>
        <h2 className="text-xl font-bold tracking-tight">Task Flow</h2>
        </div>

        <nav className="flex flex-col gap-4 ">
          {sidebarLinks.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              className="font-medium text-gray-700"
              onClick={() => setOpen(false)}
            >
                <div className="flex items-center gap-2 py-3">
                {item.icon}
              {item.title}
              </div>
            </Link>
          ))}
          <footer className="pt-60">
           <Button color="primary" className="rounded-lg w-full font-bold">
          <FiPlus /> New Project
        </Button>
        </footer>
        </nav>
      </aside>

      {/* ✅ Main Content */}
      <main className="flex-1  sm:ml-34 ml-24  lg:ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
}
