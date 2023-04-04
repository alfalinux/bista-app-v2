import { useState } from "react";
import Headbar from "./layout/Headbar";
import LeftMenu from "./layout/LeftMenu";

const Layout = (props) => {
  const [showMenuDesktop, setShowMenuDesktop] = useState(true);
  const [showMenuMobile, setShowMenuMobile] = useState(false);

  const showMenuDesktopHandler = (e) => {
    setShowMenuDesktop(!showMenuDesktop);
  };

  const showMenuMobileHandler = (e) => {
    setShowMenuMobile(!showMenuMobile);
  };

  return (
    <div className="w-full h-[100dvh] flex flex-col bg-white">
      <Headbar
        showMenuDesktopHandler={showMenuDesktopHandler}
        showMenuMobileHandler={showMenuMobileHandler}
        showMenuDesktop={showMenuDesktop}
        showMenuMobile={showMenuMobile}
      />
      <div className="w-full h-full flex overflow-hidden">
        <LeftMenu showMenuDesktop={showMenuDesktop} showMenuMobile={showMenuMobile} />
        <div className="w-full h-full bg-white">
          <div className="absolute z-10 w-full -translate-y-2 h-2 bg-transparent shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)]"></div>
          <main className={`w-full h-full overflow-y-scroll py-4 bg-gray-100`}>{props.children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;

// <div className="w-full h-[100dvh] flex bg-zinc-100">
// <div className="hidden fixed top-0 lg:w-64 h-full lg:block">
//   <LeftMenu />
// </div>
// <div className="w-full flex flex-col items-center justify-start lg:ml-[16rem] ">
//   <div className="w-full flex flex-col">
//     <TopNav />
//   </div>
//   <main className="w-full h-full py-4 overflow-y-scroll bg-zinc-100">{props.children}</main>
// </div>
// </div>
