"use client";
import ContentDashboardHasil from "@/app/components/Fragments/ContentDashboardHasil";
import ContentDashboardPermintaan from "@/app/components/Fragments/ContentDashboardPermintaan";
import ContentDashboardProses from "@/app/components/Fragments/ContentDashboardProses";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import DashboardPermintaanLayouts from "@/app/components/Layouts/DashboardPermintaanLayouts";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const PermintaanPage = () => {
  const pathname = usePathname();
  const [linkStatus, setLinkStatus] = useState("/permintaan");

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
