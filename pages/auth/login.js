import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingSpinner from "@/components/utils/LoadingSpinner";
import {
  ArrowRightOnRectangleIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const LoginPage = () => {
  const { status } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    status === "authenticated" && router.push("/");
  }, [status]);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const userLoginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: e.target[0].value,
      password: e.target[1].value,
    });
    setLoginStatus(result.error);
    setIsLoading(false);

    if (!result.error) {
      setLoginStatus("selamat datang!");
      router.replace("/");
    }
  };

  return (
    <>
      {status === "unauthenticated" ? (
        <div className="absolute top-0 left-0 w-[100%] h-[100dvh] flex flex-col justify-center items-center gap-4 bg-bg-login bg-cover bg-right bg-no-repeat">
          <img src="/images/bista-header-color.png" alt="logo bista" className="mix-blend-soft-light" />
          <form
            action="submit"
            onSubmit={userLoginHandler}
            className="w-96 p-4 mx-auto border-[2px] border-white rounded-xl bg-black/10 backdrop-blur-md"
          >
            <div className="w-full flex items-center gap-2 py-2 text-white border-b-[1px] my-4">
              <UserIcon className="h-5" />
              <div className="w-full relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder=" "
                  className="w-full login__input"
                />
                <label htmlFor="email" className="login__label">
                  Email
                </label>
              </div>
            </div>
            <div className="w-full flex gap-2 py-2 text-white border-b-[1px] mb-4">
              <KeyIcon className="h-5" />
              <div className="w-full relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  placeholder=" "
                  className="w-full login__input"
                />
                <label htmlFor="password" className="login__label">
                  Password
                </label>
                {showPassword ? (
                  <EyeSlashIcon
                    className="h-5 absolute top-0 right-0 hover:cursor-pointer"
                    onClick={showPasswordHandler}
                  />
                ) : (
                  <EyeIcon
                    className="h-5 absolute top-0 right-0 hover:cursor-pointer"
                    onClick={showPasswordHandler}
                  />
                )}
              </div>
            </div>
            <div className="flex justify-center items-center mb-4">
              {isLoading ? <LoadingSpinner color="gray" size="md" /> : loginStatus}
            </div>
            <button className="w-full p-4 bg-white text-center text-gray-700 font-semibold flex gap-1 align-center items-center justify-center rounded-lg hover:bg-gray-200">
              <p>Login</p>
              <ArrowRightOnRectangleIcon className="h-5" />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default LoginPage;
