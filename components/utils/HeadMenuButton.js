import { useEffect, useState } from "react";
import { BellAlertIcon, ChevronDownIcon, EnvelopeIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import Swal from "sweetalert2";
import { signOut } from "next-auth/react";

const HeadMenuButton = (props) => {
  const { theme, setTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkmode, setDarkMode] = useState(() => {
    if (theme == "system") {
      return window.matchMedia("(prefers-color-scheme:dark)").matches;
    } else if (theme == "dark") {
      return true;
    } else {
      return false;
    }
  });

  const darkmodeHandler = (e) => {
    setDarkMode(!darkmode);
  };

  useEffect(() => {
    setTheme(darkmode ? "dark" : "light");
  }, [darkmode]);

  const userMenuHandler = (e) => {
    setShowUserMenu(!showUserMenu);
  };

  const onLogoutHandler = () => {
    Swal.fire({
      title: "Logout",
      text: "Apakah Anda mau keluar dari aplikasi?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      confirmButtonText: "Ya, keluar",
      cancelButtonColor: "#dc2626",
      cancelButtonText: "Tidak jadi",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut({ callbackUrl: "/auth/login" });
        Swal.fire({
          title: "Berhasil",
          text: "Anda sudah keluar dari aplikasi",
          icon: "success",
          showConfirmButton: false,
        });
      }
    });
  };

  const userMenu = (
    <ul className="flex flex-col gap-2 pt-2 select-none border-[1px] border-transparent border-t-red-800">
      <li className="text-gray-100 hover:text-gray-800 hover:cursor-pointer duration-150">Profile</li>
      <li className="text-gray-100 hover:text-gray-800 hover:cursor-pointer duration-150">Ganti Password</li>
      <li
        className="text-gray-100 hover:text-gray-800 hover:cursor-pointer duration-150"
        onClick={onLogoutHandler}
      >
        Logout
      </li>
    </ul>
  );

  return (
    <div className={`${props.style} bottom-0`}>
      {/* Tombol Darkmode - Notif - Email */}
      <div className="flex items-center justify-center order-3 lg:order-1">
        <div
          className="w-8 h-8 mr-4 flex items-center justify-center rounded-lg text-gray-500 bg-gray-200 hover:bg-red-600 hover:text-gray-100 hover:cursor-pointer transition-all duration-200"
          onClick={darkmodeHandler}
        >
          {darkmode ? <MoonIcon className="h-5" /> : <SunIcon className="h-5" />}
        </div>
        <div className="w-8 h-8 mr-4 flex items-center justify-center rounded-lg text-gray-500 bg-gray-200 hover:bg-red-600 hover:text-gray-100 hover:cursor-pointer transition-all duration-200">
          <BellAlertIcon className="h-5" />
        </div>
        <div className="w-8 h-8 mr-4 flex items-center justify-center rounded-lg text-gray-500 bg-gray-200 hover:bg-red-600 hover:text-gray-100 hover:cursor-pointer transition-all duration-200">
          <EnvelopeIcon className="h-5" />
        </div>
      </div>

      {/* Field User Login */}
      <div
        className={`relative min-w-max px-4 bg-red-600 text-white text-sm font-semibold flex items-center justify-center gap-2 h-14 order-1 lg:order-2`}
      >
        <UserCircleIcon className="h-10 hover:cursor-pointer" onClick={userMenuHandler} />
        <p className="hover:cursor-pointer" onClick={userMenuHandler}>
          {props.user.nama}
        </p>
        <ChevronDownIcon
          className={`h-4 ${
            showUserMenu ? "rotate-180" : ""
          } transition-transform duration-200 hover:cursor-pointer`}
          onClick={userMenuHandler}
        />

        {/* Menu USer Login HEad Bar*/}
        <div
          className={`hidden lg:block lg:absolute lg:top-14 lg:left-0 bg-red-600 w-full mb-2 ${
            showUserMenu ? "h-auto px-4 pb-4" : "h-0 px-4"
          } transition-all order-2`}
        >
          {showUserMenu ? userMenu : null}
        </div>
      </div>

      {/* Menu USer Login LEft MEnu */}
      <div
        className={`lg:hidden bg-red-600 w-full mb-2 ${
          showUserMenu ? "h-auto px-4 pb-4" : "h-0 px-4"
        } transition-all order-2`}
      >
        {showUserMenu ? userMenu : null}
      </div>
    </div>
  );
};

export default HeadMenuButton;
