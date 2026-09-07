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


  return {
    register,
    reset,
    handleSubmit,
    errors,
    navigate,
  };
}

export default authHook;
