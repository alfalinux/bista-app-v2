import {
  RectangleGroupIcon,
  RocketLaunchIcon,
  ComputerDesktopIcon,
  ArrowDownOnSquareStackIcon,
  TruckIcon,
  PrinterIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import LeftMenuButton from "../utils/LeftMenuButton";
import HeadMenuButton from "../utils/HeadMenuButton";

const LeftMenu = (props) => {
  const menus = [
    { name: "Beranda", link: "/", icon: RectangleGroupIcon },
    {
      name: "Monitoring",
      link: "",
      icon: ComputerDesktopIcon,
      submenu: [
        { name: "Transaksi Harian", link: "/monitoring/transaksi-harian" },
        { name: "Cek Resi", link: "/monitoring/cek-resi" },
      ],
    },
    {
      name: "Outgoing",
      link: "",
      icon: RocketLaunchIcon,
      submenu: [
        { name: "Create Order", link: "/outgoing/create-order" },
        { name: "Create Manifest", link: "/outgoing/create-manifest" },
        { name: "Create Surat Jalan", link: "/outgoing/create-surat-jalan" },
      ],
    },
    {
      name: "Incoming",
      link: "",
      icon: ArrowDownOnSquareStackIcon,
      submenu: [
        { name: "Receive Manifest", link: "/incoming/receive-manifest" },
        { name: "Receive Surat Jalan", link: "/incoming/receive-surat-jalan" },
      ],
    },
    {
      name: "Delivery",
      link: "",
      icon: TruckIcon,
      submenu: [
        { name: "Create Delivery", link: "/delivery/create-delivery" },
        { name: "Update Status Delivery", link: "/delivery/update-status-delivery" },
      ],
    },
    {
      name: "Reprint",
      link: "",
      icon: PrinterIcon,
      submenu: [
        { name: "Reprint Resi & Label", link: "/reprint/reprint-resi" },
        { name: "Reprint Manifest", link: "/reprint/reprint-manifest" },
        { name: "Reprint Surat Jalan", link: "/reprint/reprint-surat-jalan" },
        { name: "Reprint Delivery", link: "/reprint/reprint-delivery" },
      ],
    },
    {
      name: "Report",
      link: "",
      icon: ClipboardDocumentListIcon,
      submenu: [{ name: "Rincian Omset Cabang", link: "/report/rincian-omset-cabang" }],
    },
  ];

  return (
    <>
      {/* Desktop Menu */}
      <div
        className={`hidden lg:block pb-8 overflow-y-scroll overflow-x-hidden scrollbar bg-white dark:bg-gray-800 ${
          props.showMenuDesktop ? "w-80" : "w-0"
        } duration-500 ease-in-out`}
      >
        {menus?.map((menu, index) => (
          <LeftMenuButton key={index} menu={menu} />
        ))}
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden relative`}>
        <div
          className={`absolute h-[100dvh] bg-black/30 dark:bg-black/80 z-10 ${
            props.showMenuMobile ? "w-[100dvw]" : "w-0"
          } duration-500 ease-in-out`}
        >
          <div
            className={`w-80 h-full pb-20 overflow-y-scroll overflow-x-hidden scrollbar flex flex-col justify-between bg-white dark:bg-black ${
              props.showMenuMobile ? "translate-x-0" : "-translate-x-full"
            } duration-500 ease-in-out`}
          >
            <section>
              {menus?.map((menu, index) => (
                <LeftMenuButton key={index} menu={menu} />
              ))}
            </section>
            <section>
              <HeadMenuButton style="lg:hidden flex flex-col mt-4" user={props.dataUser} />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftMenu;
