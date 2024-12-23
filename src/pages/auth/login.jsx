import { toast } from "sonner";
import { useState } from "react";
import { Link } from "react-router";
import { LogIn } from "lucide-react";
import { useDispatch } from "react-redux";

import { loginFormControls } from "@/config";
import { loginUser } from "@/store/authSlice";

import Logo from "@/components/shared/Logo";
import CommonForm from "@/components/shared/form";

const initialState = {
  email: "anashany2193@gmail.com",
  password: "123456789",
};

// const initialState = {
//   email: "anashany219@gmail.com",
//   password: "123456789",
// };

// const initialState = {
//   email: "",
//   password: "",
// };

/**
 * Authentication Login Page
 * @description This component is used to login the user to the system using email and password.
 */
const AuthLogin = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData))
      .unwrap()
      .then((data) => toast.success(data.message))
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-3 px-8 lg:px-24">
      <Logo borderColor="white" paddingSize={4} visible="lg:hidden" />
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Sign into your account
      </h1>
      <div className="flex gap-1">
        <p>Don&apos;t have an account?</p>
        <Link to="/auth/register" className="font-bold hover:underline">
          Register
        </Link>
      </div>
      <CommonForm
        onSubmit={onSubmit}
        formData={formData}
        setFormData={setFormData}
        formControls={loginFormControls}
        buttonContent={
          <>
            Sign In <LogIn />
          </>
        }
      />
    </div>
  );
};

export default AuthLogin;
