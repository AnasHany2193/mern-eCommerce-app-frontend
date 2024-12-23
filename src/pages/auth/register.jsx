import { toast } from "sonner";
import { useState } from "react";
import { UserPlus } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";

import { registerFormControls } from "@/config";
import { registerUser } from "@/store/authSlice";

import Logo from "@/components/shared/Logo";
import CommonForm from "@/components/shared/form";

const initialState = {
  email: "",
  password: "",
  username: "",
};

/**
 * Authentication Register Page
 * @description This page is used to register a new user account with the system and login the user with the credentials provided by the user.
 */
const AuthRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(formData))
      .unwrap()
      .then((data) => {
        toast.success(data.message);
        navigate("/auth/login");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-3 px-8 lg:px-24">
      <Logo borderColor="white" paddingSize={4} visible="lg:hidden" />
      <h1 className="text-3xl font-bold">Create new account</h1>
      <div className="flex gap-1">
        <p>Already have an account?</p>
        <Link to="/auth/login" className="font-bold">
          Login
        </Link>
      </div>
      <CommonForm
        buttonContent={
          <>
            Sign Up <UserPlus />
          </>
        }
        onSubmit={onSubmit}
        formData={formData}
        setFormData={setFormData}
        formControls={registerFormControls}
      />
    </div>
  );
};

export default AuthRegister;
