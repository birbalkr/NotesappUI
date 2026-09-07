import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function authHook() {

  let navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerData = (data: any) => {

    console.log("Register Data:", data);
  };

  return {
    register,
    reset,
    handleSubmit,
    errors,
    navigate,
  };
}

export default authHook;
