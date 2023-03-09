import LeftMenu from "./layout/LeftMenu";
import TopNav from "./layout/TopNav";

const Layout = (props) => {
  return (
    <div className="w-full h-screen flex">
      <div className="hidden h-full w-72 lg:block">
        <LeftMenu />
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <TopNav />
        <main className="w-full h-full ml-2 overflow-scroll scrollbar bg-zinc-100">{props.children}</main>
      </div>
    </div>
  );
};

export default Layout;
