import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { ChartNoAxesCombined, LogOut } from "lucide-react";

import { adminMenuItems } from "@/config";
import { logoutUser } from "@/store/authSlice";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

/**
 * Admin sidebar component
 * @description This component is used to display the admin sidebar on the admin panel.
 */
const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <aside className="flex-col justify-between hidden p-6 bg-background w-52 lg:flex">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <ChartNoAxesCombined size={28} />
          <span className="text-xl font-bold">Admin Panel</span>
        </div>

        <Separator className="my-3" />

        <div className="flex flex-col flex-1 gap-4 mt-6">
          {adminMenuItems.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className="flex items-center gap-2 px-3 py-2 hover:rounded-md hover:bg-gray-100"
            >
              <item.icon size={20} />
              <span className="text-base">{item.title}</span>
            </Link>
          ))}
        </div>

        <Button className="bg-red-500 hover:bg-red-600" onClick={handleLogout}>
          <LogOut className="mr-1" /> Logout
        </Button>
      </aside>
    </>
  );
};

export default AdminSidebar;
