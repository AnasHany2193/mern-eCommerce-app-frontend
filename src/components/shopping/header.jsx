import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, Menu, ShoppingCart, UserRoundCog } from "lucide-react";

import ImgLogo from "../../assets/cart-icon.png";

import { shoppingMenuItems } from "@/config";
import { logoutUser } from "@/store/authSlice";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Sheet,
  SheetTitle,
  SheetTrigger,
  SheetContent,
  SheetDescription,
} from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import UserCartWrapper from "./cartWrapper";
import { fetchCartItem } from "@/store/cartSlice";

const MenuItems = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();

  const handleNavigate = (item) => {
    sessionStorage.removeItem("filters");

    const filter =
      item.id !== "home" && item.id !== "products" && item.id !== "search"
        ? { Category: [item.id] }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(filter));

    location.pathname.includes("listing") && filter !== null
      ? setSearchParams(new URLSearchParams(`?Category=${item.id}`))
      : navigate(item.path);
  };

  return (
    <nav className="flex flex-col gap-4 mb-3 lg:mb-0 lg:items-center lg:flex-row">
      {shoppingMenuItems.map((item) => (
        <Button
          variant="link"
          key={item.id}
          onClick={() => handleNavigate(item)}
          className="text-gray-700 transition-colors duration-200 rounded-lg hover:text-blue-600 hover:bg-gray-200"
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );
};

const HeaderRightContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { cartItems } = useSelector((state) => state.shoppingCart);

  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => dispatch(logoutUser());

  useEffect(() => {
    dispatch(fetchCartItem());
  }, [dispatch]);

  return (
    <div className="flex gap-4 justify-evenly lg:items-center lg:flex-row">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -right-1 -top-2">
            {cartItems?.items?.length}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems?.items?.length > 0 ? cartItems.items : []}
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            <AvatarFallback className="font-extrabold text-white capitalize bg-black">
              {user.username[0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right">
          <DropdownMenuLabel>Logged in as {user.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shopping/account")}>
            <UserRoundCog className="w-4 h-4 mr-2" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppingHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="static top-0 z-40 w-full border-b bg-background">
      <header className="flex items-center justify-between px-4 py-4 md:px-6">
        <Link to="home" className="flex items-center gap-2">
          <img src={ImgLogo} alt="image-logo" width={32} />
          <h2 className="font-bold">e-Commerce</h2>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full max-w-xs">
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
            <HeaderRightContent />
            <MenuItems />
          </SheetContent>
        </Sheet>

        <div className="hidden lg:block">
          <MenuItems />
        </div>
        {isAuthenticated ? (
          <div className="hidden lg:flex">
            <HeaderRightContent />
          </div>
        ) : null}
      </header>
    </header>
  );
};

export default ShoppingHeader;
