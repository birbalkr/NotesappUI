import { NavLink } from "react-router";
import authHook from "../../hook/authHook";
import { loginApi } from "../../api/authApi";
import { setAuthToken } from "../../utils/authUtils";

export default function LoginForm() {

    const { register, reset, handleSubmit, navigate } = authHook();

    const loginData = async (data: any) => {
        const { email, password } = data;
        await loginApi({ email, password })
            .then((response) => {
                console.log("Login successful now next api:", response);
                // Store the token in localStorage
                if (response.token) {
                    setAuthToken(response.token);
                } else if (response.data?.token) {
                    setAuthToken(response.data.token);
                }
            })
            .catch((error) => {
                console.error("Registration failed:", error);
            });
        reset();

        navigate("/notes");
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <form onSubmit={handleSubmit(loginData)} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Welcome Back
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Login to your account
                    </p>
                </div>

                {/* Email */}
                <div className="mb-5">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Email
                    </label>

                    <input
                        {...register("email", { required: "Email is required" })}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10"
                    />
                </div>

                {/* Password */}
                <div className="mb-2">
                    <div className="mb-2 flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <button
                            type="button"
                            className="text-sm font-medium text-gray-600 hover:text-black hover:underline"
                        >
                            <NavLink to="/auth/forgot">
                                Forgot password?
                            </NavLink>
                        </button>
                    </div>

                    <input
                        {...register("password", { required: "Password is required" })}
                        type="password"
                        placeholder="Enter your password"
                        className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10"
                    />
                </div>

                {/* Login button */}
                <button
                    type="submit"
                    className="mt-6 w-full rounded-xl bg-black px-4 py-3.5 font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
                >
                    Login
                </button>

                {/* Register */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <NavLink
                        to="/auth/register"
                        className="font-semibold text-black hover:underline"
                    >
                        Create account
                    </NavLink>
                </p>
            </form>
        </div>
    );
}
