import LeftMenu from "./layout/LeftMenu";
import TopNav from "./layout/TopNav";

const Layout = (props) => {
  return (
    <div className="w-full max-h-[100dvh] flex">
      <div className="hidden w-72 lg:block">
        <LeftMenu />
      </div>
      <div className="w-full flex flex-col items-center justify-start">
        <TopNav />
        <main className="w-full ml-2 overflow-scroll scrollbar bg-zinc-100">{props.children}</main>
      </div>
    </div>
  );
};

export default Layout;
