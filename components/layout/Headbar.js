import { Bars3BottomLeftIcon, Bars3Icon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import HeadMenuButton from "../utils/HeadMenuButton";
import { useTheme } from "next-themes";

const Headbar = (props) => {
  const { theme } = useTheme();
  const router = useRouter();
  const pathArray =
    router.pathname === "/" ? "Beranda" : router.pathname.split("/").slice(-1).join("").replaceAll("-", " ");
  return (
    <header className="sticky top-0 w-full h-14 flex items-center bg-white dark:bg-gray-800 duration-500 ease-in-out">
      <div className={`hidden lg:block ${props.showMenuDesktop ? "w-80" : "w-0"} duration-500 ease-in-out`}>
        <img
          className="h-8 ml-4"
          src={theme === "dark" ? "/images/bista-header-border.png" : "/images/bista-header-color.png"}
          alt="logo bista cargo"
        />
      </div>
      <div className="w-full flex items-center gap-4">
        {/* Desktop Menu */}
        <div
          className="hidden lg:flex w-14 h-14 bg-red-600 items-center justify-center hover:cursor-pointer"
          onClick={props.showMenuDesktopHandler}
        >
          {props.showMenuDesktop ? (
            <Bars3BottomLeftIcon className="h-8 text-white" />
          ) : (
            <Bars3Icon className="h-8 text-white" />
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className="lg:hidden w-14 h-14 bg-red-600 flex items-center justify-center hover:cursor-pointer"
          onClick={props.showMenuMobileHandler}
        >
          {props.showMenuMobile ? (
            <Bars3BottomLeftIcon className="h-8 text-white" />
          ) : (
            <Bars3Icon className="h-8 text-white" />
          )}
        </div>

        {/* Navigation Page */}
        <div className="flex items-center gap-1 font-semibold text-sm text-gray-600 dark:text-gray-200 capitalize">
          <ClipboardDocumentIcon className="h-6" />
          <p>Halaman {pathArray}</p>
        </div>
        <HeadMenuButton style="hidden lg:flex items-center ml-auto" user={props.dataUser} />
      </div>
    </header>
  );
};

export default Headbar;
