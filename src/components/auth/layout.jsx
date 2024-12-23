import { Outlet } from "react-router";
import Logo from "../shared/Logo";

/**
 * Authentication layout component
 * @description This component is used to display the authentication layout with the logo and the login form on the left side of the screen
 */
const AuthLayout = () => {
  return (
    <div className="flex w-full min-h-screen">
      <div className="items-center justify-center hidden w-1/2 px-12 bg-black rounded-r-[100px] lg:flex">
        <div className="flex flex-col items-center justify-center max-w-md gap-8 text-center text-primary-foreground ">
          <Logo borderColor="white" paddingSize={4} />
          <div className="text-4xl font-extrabold">
            Welcome to eCommerce Shopping
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center flex-1 py-12 bg-background sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
