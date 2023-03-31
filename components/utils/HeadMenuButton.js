import { useState } from "react";
import { BellAlertIcon, ChevronDownIcon, EnvelopeIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const HeadMenuButton = (props) => {
  const [darkmode, setDarkMode] = useState(false);
  const darkmodeHandler = (e) => {
    setDarkMode(!darkmode);
  };
  return (
    <div className={`${props.style} bottom-0`}>
      <div className="flex items-center justify-center">
        <div
          className="w-8 h-8 mr-4 flex items-center justify-center rounded-lg text-gray-500 bg-gray-200 hover:bg-red-500 hover:text-gray-100 hover:cursor-pointer transition-all duration-200"
          onClick={darkmodeHandler}
        >
          {darkmode ? <MoonIcon className="h-5" /> : <SunIcon className="h-5" />}
        </div>
        <div className="w-8 h-8 mr-4 flex items-center justify-center rounded-lg text-gray-500 bg-gray-200 hover:bg-red-500 hover:text-gray-100 hover:cursor-pointer transition-all duration-200">
          <BellAlertIcon className="h-5" />
        </div>
        <div className="w-8 h-8 mr-4 flex items-center justify-center rounded-lg text-gray-500 bg-gray-200 hover:bg-red-500 hover:text-gray-100 hover:cursor-pointer transition-all duration-200">
          <EnvelopeIcon className="h-5" />
        </div>
      </div>
      <div className="min-w-max h-14 px-4 bg-red-500 text-white text-sm font-semibold flex items-center justify-center gap-2">
        <UserCircleIcon className="h-10" />
        <p>Eri Andy Nata</p>
        <ChevronDownIcon className="h-4" />
      </div>
    </div>
  );
};

export default HeadMenuButton;
