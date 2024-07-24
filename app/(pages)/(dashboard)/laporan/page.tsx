"use client";
import ContentDashboardLaporanFitur from "@/app/components/Fragments/laporan/ContentDashboardLaporanFitur";
import ContentDashboardLaporanPermintaan from "@/app/components/Fragments/laporan/ContentDashboardLaporanPermintaan";
import ContentDashboardLaporanUser from "@/app/components/Fragments/laporan/ContentDashboardLaporanUser";
import DashboardLaporanLayouts from "@/app/components/Layouts/DashboardLaporanLayouts";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const LaporanPage = () => {
  const pathname = usePathname();
  const [linkStatus, setLinkStatus] = useState<string>("/laporanUser");

  function toLinkLaporanUser() {
    setLinkStatus("/laporanUser");
  }

  function toLinkLaporanPermintaan() {
    setLinkStatus("/laporanPermintaan");
  }

  function toLinkLaporanFitur() {
    setLinkStatus("/laporanFitur");
  }
  return (
    <DashboardLayout hover={pathname}>
      <DashboardLaporanLayouts
        linkStatus={linkStatus}
        laporanUser={toLinkLaporanUser}
        laporanPermintaan={toLinkLaporanPermintaan}
        laporanFitur={toLinkLaporanFitur}
      >
        {linkStatus === "/laporanUser" && <ContentDashboardLaporanUser />}
        {linkStatus === "/laporanPermintaan" && (
          <ContentDashboardLaporanPermintaan />
        )}
        {linkStatus === "/laporanFitur" && <ContentDashboardLaporanFitur />}
      </DashboardLaporanLayouts>
    </DashboardLayout>
  );
};

export default LaporanPage;
