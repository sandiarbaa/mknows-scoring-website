"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

// Component
import ContentDashboardHasil from "@/app/components/Fragments/permintaan/ContentDashboardHasil";
import ContentDashboardPermintaan from "@/app/components/Fragments/permintaan/ContentDashboardPermintaan";
import ContentDashboardProses from "@/app/components/Fragments/permintaan/ContentDashboardProses";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import DashboardPermintaanLayouts from "@/app/components/Layouts/DashboardPermintaanLayouts";

const PermintaanPage = () => {
  const pathname = usePathname();
  const [linkStatus, setLinkStatus] = useState<string>("/permintaan");

  function toLinkPermintaan() {
    setLinkStatus("/permintaan");
  }

  function toLinkProses() {
    setLinkStatus("/proses");
  }

  function toLinkHasil() {
    setLinkStatus("/hasil");
  }

  return (
    <DashboardLayout hover={pathname}>
      <DashboardPermintaanLayouts
        linkStatus={linkStatus}
        permintaan={toLinkPermintaan}
        proses={toLinkProses}
        hasil={toLinkHasil}
      >
        {linkStatus === "/permintaan" && <ContentDashboardPermintaan />}
        {linkStatus === "/proses" && <ContentDashboardProses />}
        {linkStatus === "/hasil" && <ContentDashboardHasil />}
      </DashboardPermintaanLayouts>
    </DashboardLayout>
  );
};

export default PermintaanPage;
