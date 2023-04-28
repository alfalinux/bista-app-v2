import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Headbar from "./layout/Headbar";
import LeftMenu from "./layout/LeftMenu";
import Head from "next/head";

const Layout = (props) => {
  const [showMenuDesktop, setShowMenuDesktop] = useState(true);
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const { data, status } = useSession();
  const router = useRouter();
  const pathArray =
    router.pathname === "/"
      ? "Beranda"
      : router.pathname
          .split("/")
          .slice(-1)
          .join("")
          .replaceAll("-", " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

  useEffect(() => {
    if (status == "unauthenticated") {
      router.push("/auth/login");
    }
  }, [router]);

  const showMenuDesktopHandler = (e) => {
    setShowMenuDesktop(!showMenuDesktop);
  };
  const showMenuMobileHandler = (e) => {
    setShowMenuMobile(!showMenuMobile);
  };

  return (
    <>
      <Head>
        <title>{pathArray}</title>
      </Head>
      {status == "authenticated" ? (
        <div className="w-full h-[100dvh] flex flex-col bg-white ">
          <Headbar
            showMenuDesktopHandler={showMenuDesktopHandler}
            showMenuMobileHandler={showMenuMobileHandler}
            showMenuDesktop={showMenuDesktop}
            showMenuMobile={showMenuMobile}
            dataUser={data}
          />
          <div className="w-full h-full flex overflow-hidden">
            <LeftMenu showMenuDesktop={showMenuDesktop} showMenuMobile={showMenuMobile} dataUser={data} />
            <div className="w-full h-full bg-white">
              <div className="absolute w-full -translate-y-2 h-2 bg-transparent shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)]"></div>
              <main
                className={`w-full h-full overflow-x-hidden overflow-y-scroll py-4 bg-gray-100 dark:bg-gray-700 duration-500 ease-in-out`}
              >
                {props.children}
              </main>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Layout;
