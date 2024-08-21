"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface SidebarItem {
  href: string;
  imageTrue: string;
  imageFalse: string;
  linkName: string;
  adminOnly?: boolean; // tambahkan properti ini untuk menandai item khusus admin
}

const dataSidebarLink: SidebarItem[] = [
  {
    href: "/dashboard",
    imageTrue: "/assets/dashboard/sidebarNavbar/dashboard-active.png",
    imageFalse: "/assets/dashboard/sidebarNavbar/dashboard.png",
    linkName: "Dashboard",
  },
  {
    href: "/permintaan",
    imageTrue: "/assets/dashboard/sidebarNavbar/permintaan-active.png",
    imageFalse: "/assets/dashboard/sidebarNavbar/permintaan.png",
    linkName: "Permintaan",
  },
  {
    href: "/laporan",
    imageTrue: "/assets/dashboard/sidebarNavbar/laporan-active.png",
    imageFalse: "/assets/dashboard/sidebarNavbar/laporan.png",
    linkName: "Laporan",
  },
  {
    href: "/kuota",
    imageTrue: "/assets/dashboard/sidebarNavbar/network-add-active.png",
    imageFalse: "/assets/dashboard/sidebarNavbar/network-add.png",
    linkName: "Kuota",
  },
  {
    href: "/inbox",
    imageTrue: "/assets/dashboard/sidebarNavbar/inbox-active.png",
    imageFalse: "/assets/dashboard/sidebarNavbar/inbox.png",
    linkName: "Inbox",
  },
  {
    href: "/setting",
    imageTrue: "/assets/dashboard/sidebarNavbar/settings.png",
    imageFalse: "/assets/dashboard/sidebarNavbar/settings.png",
    linkName: "Setting",
  },
  {
    href: "/register",
    imageTrue: "/assets/dashboard/sidebarNavbar/register.png",
    imageFalse: "/assets/dashboard/sidebarNavbar/register.png",
    linkName: "Register",
    adminOnly: true, // tandai bahwa item ini hanya untuk admin
  },
];

interface SidebarLinkProps {
  hover: string;
}



const SidebarLink: React.FC<SidebarLinkProps> = ({ hover }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, [trigger]);

  useEffect(() => {
    const handleStorageChange = () => {
      setTrigger(prev => !prev); // memicu re-render
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const isAdmin = userRole === "admin";

  return (
    <div className="flex flex-col">
      <div>
        {dataSidebarLink
          .filter((item) => !item.adminOnly || (item.adminOnly && isAdmin)) // filter berdasarkan status admin
          .map((item, index) => {
            let imageSize;
            if (index === 1) {
              imageSize = 15;
            } else if (index === 3) {
              imageSize = 25;
            } else {
              imageSize = 20;
            }

            const isActive =
              (index === 1 && hover === "/permintaan/tambahData") ||
              (index === 1 && hover === "/permintaan/tambahData/inputTemplate") ||
              hover === item.href;

            const linkClassName = `${
              isActive ? "bg-ijoToska text-white" : ""
            } w-full px-5 py-2.5 mb-3 rounded-md flex items-center`;

            return (
              <Link key={index} href={item.href} className={linkClassName}>
                <Image
                  src={isActive ? item.imageTrue : item.imageFalse}
                  alt={`${item.linkName}-link-icon`}
                  width={imageSize}
                  height={imageSize}
                  className="mr-3"
                />
                <p
                  className={`font-medium ${
                    isActive ? "text-white" : "text-tulisan"
                  }`}
                >
                  {item.linkName}
                </p>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default SidebarLink;


// "use client";
// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import RegisterPage from "@/app/(pages)/(dashboard)/register/page";

// interface SidebarItem {
//   href: string;
//   imageTrue: string;
//   imageFalse: string;
//   linkName: string;
// }

// const dataSidebarLink: SidebarItem[] = [
//   {
//     href: "/dashboard",
//     imageTrue: "/assets/dashboard/sidebarNavbar/dashboard-active.png",
//     imageFalse: "/assets/dashboard/sidebarNavbar/dashboard.png",
//     linkName: "Dashboard",
//   },
//   {
//     href: "/permintaan",
//     imageTrue: "/assets/dashboard/sidebarNavbar/permintaan-active.png",
//     imageFalse: "/assets/dashboard/sidebarNavbar/permintaan.png",
//     linkName: "Permintaan",
//   },
//   {
//     href: "/laporan",
//     imageTrue: "/assets/dashboard/sidebarNavbar/laporan-active.png",
//     imageFalse: "/assets/dashboard/sidebarNavbar/laporan.png",
//     linkName: "Laporan",
//   },
//   {
//     href: "/kuota",
//     imageTrue: "/assets/dashboard/sidebarNavbar/network-add-active.png",
//     imageFalse: "/assets/dashboard/sidebarNavbar/network-add.png",
//     linkName: "Kuota",
//   },
//   {
//     href: "/inbox",
//     imageTrue: "/assets/dashboard/sidebarNavbar/inbox-active.png",
//     imageFalse: "/assets/dashboard/sidebarNavbar/inbox.png",
//     linkName: "Inbox",
//   },
// ];

// interface SidebarLinkProps {
//   hover: string;
// }

// const SidebarLink: React.FC<SidebarLinkProps> = ({ hover }) => {
//   const role = localStorage.getItem("userRole");
//   return (
//     <div className="flex flex-col">
//       <div>
//         {dataSidebarLink.map((item, index) => {
//           // Determine image size
//           let imageSize = 20;
//           if (index === 1) {
//             imageSize = 15;
//           } else if (index === 3) {
//             imageSize = 25;
//           }

//           // Determine active state
//           const isActive =
//             (index === 1 && (hover === "/permintaan/tambahData" || hover === "/permintaan/tambahData/inputTemplate")) ||
//             hover === item.href;

//           const linkClassName = `${
//             isActive ? "bg-ijoToska text-white" : ""
//           } w-full px-5 py-2.5 mb-3 rounded-md flex items-center`;

//           return (
//             <Link key={index} href={item.href} className={linkClassName}>
//               <Image
//                 src={isActive ? item.imageTrue : item.imageFalse}
//                 alt={`${item.linkName}-link-icon`}
//                 width={imageSize}
//                 height={imageSize}
//                 className="mr-3"
//               />
//               <p className={`font-medium ${isActive ? "text-white" : "text-tulisan"}`}>
//                 {item.linkName}
//               </p>
//             </Link>
//           );
//         })}
//         {role === 'admin' && (
//           <RegisterPage />
//         )}
//       </div>
//     </div>
//   );
// };

// export default SidebarLink;
