import { UserIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import LeftMenu from "./LeftMenu";
import { useState } from "react";

const TopNav = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const showMenuHandler = (e) => {
    setShowMenu(true);
  };
  const closeMenuHandler = (e) => {
    setShowMenu(false);
  };
  const router = useRouter();
  const pathArray =
    router.pathname === "/" ? "Beranda" : router.pathname.split("/").slice(-1).join("").replaceAll("-", " ");

  return (
    <div className="relative w-full p-4 mb-4 bg-white shadow-md shadow-zinc-200 flex items-center gap-2 text-zinc-500">
      <Bars3Icon className="h-6 cursor-pointer lg:hidden" onClick={showMenuHandler} />
      <p className="text-md capitalize">Halaman: {pathArray}</p>
      <div className="flex gap-2 items-center ml-auto cursor-pointer hover:text-[#ff0000] transition-colors duration-150">
        <UserIcon className="h-6 rounded-full border-[1px] bg-zinc-200" />
        <p className="text-md">Eri Andi Nata</p>
        <ChevronDownIcon className="h-4" />
      </div>

      <div
        className={`absolute top-0 left-0 w-full bg-black/50 lg:hidden ${showMenu ? "block" : "hidden"}`}
      ></div>

      <div
        className={`absolute top-0 left-0 w-full bg-transparent z-10 backdrop-blur-sm duration-500 lg:hidden ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className={`w-max h-screen flex duration-500 ${
            showMenu ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
        >
          <LeftMenu />
          <XMarkIcon
            className="h-6 bg-zinc-800 p-1 text-zinc-100 cursor-pointer hover:text-[#ff0000]"
            onClick={closeMenuHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
