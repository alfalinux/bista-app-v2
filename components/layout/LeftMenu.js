import {
  RectangleGroupIcon,
  RocketLaunchIcon,
  ArrowDownOnSquareStackIcon,
  TruckIcon,
  PrinterIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import LeftMenuButton from "../utils/LeftMenuButton";
import React from "react";

const LeftMenu = (props) => {
  const menus = [
    { name: "Beranda", link: "/", icon: RectangleGroupIcon },
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
        { name: "Update Status Delivery", link: "/incoming/update-status-delivery" },
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
      submenu: [
        { name: "Rincian Omset Cabang", link: "/report/rincian-omset-cabang" },
        {
          name: "Leadtime Achievement Based on Monthly Omset",
          link: "/report/leadtime-achievement",
        },
        { name: "Test Formik", link: "/report/test-formik" },
      ],
    },
  ];

  return (
    <div
      className={`relative w-64 h-full overflow-hidden flex-col gap-1 bg-white border-r-[1px] border-zinc-200`}
    >
      <div className="bg-white/80 w-64">
        <img className="w-48 p-4 ml-2" src="/images/bista-header-color.png" alt="logo bista cargo" />
      </div>

      <div className="absolute top-0 left-0 w-64 h-5/6 mt-14  overflow-y-scroll overflow-x-hidden scrollbar">
        {menus?.map((menu, index) => (
          <LeftMenuButton key={index} menu={menu} />
        ))}
      </div>
    </div>
  );
};

export default LeftMenu;
