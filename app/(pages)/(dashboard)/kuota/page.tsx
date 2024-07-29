"use client";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import DashboardAlokasiKuota from "@/app/components/Layouts/DashboardAlokasiKuota";
import ContentDashboardAlokasiKuota from "@/app/components/Fragments/kuota/ContentDashboardAlokasiKuota";
import ContentDashboardRiwayatKuota from "@/app/components/Fragments/kuota/ContentDashboardRiwayatKuota";

const KuotaPage = () => {
  const pathname = usePathname();
  const [linkStatus, setLinkStatus] = useState<string>("/AlokasiKuota");

  function toLinkAlokasiKuota() {
    setLinkStatus("/AlokasiKuota");
  }
  function toLinkRiwayatAlokasiKuota() {
    setLinkStatus("/RiwayatAlokasiKuota");
  }

  return (
    <DashboardLayout hover={pathname}>
      <DashboardAlokasiKuota
        linkStatus={linkStatus}
        alokasiKuota={toLinkAlokasiKuota}
        riwayatAlokasiKuota={toLinkRiwayatAlokasiKuota}
      >
        {linkStatus === "/AlokasiKuota" && (
          <ContentDashboardAlokasiKuota
            riwayatAlokasiKuota={toLinkRiwayatAlokasiKuota}
          />
        )}
        {linkStatus === "/RiwayatAlokasiKuota" && (
          <ContentDashboardRiwayatKuota />
        )}
      </DashboardAlokasiKuota>
    </DashboardLayout>
  );
};

export default KuotaPage;
