import { Link, useNavigate } from "react-router";
import { ChartNoAxesCombined, LogOut, Menu } from "lucide-react";

import { adminMenuItems } from "@/config";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const AdminHeader = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b-2 bg-background lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="md:hidden w-[250px]">
          <SheetHeader>
            <SheetTitle>
              <div className="flex gap-2 items-c enter">
                <ChartNoAxesCombined size={24} />
                <span className="text-xl font-bold">Admin Panel</span>
              </div>
            </SheetTitle>
          </SheetHeader>
          <Separator className="my-3" />
          <div className="flex flex-col gap-3 mt-5">
            {adminMenuItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 hover:rounded-md hover:bg-gray-100"
              >
                <item.icon size={20} />
                <span className="text-base">{item.title}</span>
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/admin/dashboard")}
      >
        <ChartNoAxesCombined size={24} />
        <span className="text-xl font-bold">Admin Panel</span>
      </div>

      <Button className="bg-red-500 hover:bg-red-600">
        <LogOut className="mr-1" /> Logout
      </Button>
    </header>
  );
};

export default AdminHeader;
