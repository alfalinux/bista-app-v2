import { ChevronRightIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const LeftMenuButton = ({ menu }) => {
  const [showSubmenu, setShowsubmenu] = useState(false);

  const router = useRouter();

  useEffect(() => {
    router.pathname.startsWith("/" + menu.name.toLowerCase()) ? setShowsubmenu(true) : null;
  }, []);

  return (
    <div>
      {/* Main Menu */}
      <Link href={menu?.link} className="outline-black/50">
        <div
          className={`flex items-center gap-2 mx-2 px-4 py-3 mt-2 rounded-lg cursor-pointer text-md text-gray-500 hover:bg-zinc-800 hover:text-zinc-100 duration-200 ${
            router.pathname.startsWith("/" + menu.name.toLowerCase()) ? "bg-zinc-800 text-zinc-100" : ""
          }`}
          onClick={() => setShowsubmenu(!showSubmenu)}
        >
          <div>{React.createElement(menu.icon, { height: "24px" })}</div>
          <h2>{menu.name}</h2>
          {menu?.submenu && (
            <ChevronRightIcon className={`h-4 ml-auto duration-200 ${showSubmenu ? "rotate-90" : ""}`} />
          )}
        </div>
      </Link>

      {/* Sub Menu */}
      <div
        className={`ml-9 mt-1 px-4 border-l-[1px] border-zinc-300 text-sm text-zinc-600 duration-200 ${
          showSubmenu ? "h-full" : "h-0"
        }`}
        style={{ transitionDelay: `300ms` }}
      >
        {menu.submenu?.map((data, index) => (
          <Link href={data.link} key={index} className={`${showSubmenu ? "" : "pointer-events-none"}`}>
            <div
              className={`p-1 flex items-center gap-2 cursor-pointer  duration-200 ${
                showSubmenu
                  ? "opacity-100"
                  : "opacity-0 translate-x-[200%] overflow-hidden pointer-events-none"
              }`}
              style={{ transitionDelay: `${index + 2}00ms` }}
            >
              <h2
                className={`hover:text-[#ff0000] duration-100 ${
                  router.pathname === data.link ? "font-bold text-[#ff0000]" : ""
                }`}
              >
                {data.name}
              </h2>
              {router.pathname === data.link ? <ShieldCheckIcon className="h-5 text-red-500" /> : null}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeftMenuButton;
