"use client";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import AreaChart from "./chart/AreaChart";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DashboardStatsContentLayout from "@/app/components/Layouts/DashboardStatsContentLayout";
import DoughnutChart from "./chart/DoughnutChart";
import VerticalBarChart from "./chart/VerticalBarChart";

const dashboardCardData = [
  {
    title: "AI Automation",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/automationAi.png",
    bgIcon: "bg-[#ECEAF5]",
    bgButton: "bg-[#897CC0]",
  },
  {
    title: "AI Document Verification",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/docVerif.png",
    bgIcon: "bg-[#D0F9E3]",
    bgButton: "bg-[#4AC1A2]",
  },
  {
    title: "AI Location & Movement",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/location.png",
    bgIcon: "bg-[#D0E6F5]",
    bgButton: "bg-[#6C99C6]",
  },
  {
    title: "AI Capacity & Earning Power",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/earning.png",
    bgIcon: "bg-[#FEF3C7]",
    bgButton: "bg-[#E7AF52]",
  },
  {
    title: "AI Capital Strength Analysis",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/capital.png",
    bgIcon: "bg-[#D0F9E3]",
    bgButton: "bg-[#4AC1A2]",
  },
  {
    title: "AI Collateral & Guarantee",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/collateral.png",
    bgIcon: "bg-[#D0E6F5]",
    bgButton: "bg-[#6C99C6]",
  },
  {
    title: "AI Condition Analysis",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/condition.png",
    bgIcon: "bg-[#FEF3C7]",
    bgButton: "bg-[#E7AF52]",
  },
  {
    title: "AI Constraint Analysis",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/constraint.png",
    bgIcon: "bg-[#ECEAF5]",
    bgButton: "bg-[#897CC0]",
  },
  {
    title: "AI Legal & Permit Analysis",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/legalPermit.png",
    bgIcon: "bg-[#D0E6F5]",
    bgButton: "bg-[#6C99C6]",
  },
  {
    title: "AI Credit Need & Purpose",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/credit.png",
    bgIcon: "bg-[#FEF3C7]",
    bgButton: "bg-[#E7AF52]",
  },
  {
    title: "AI Digital FootPrint",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/digitalFoot.png",
    bgIcon: "bg-[#ECEAF5]",
    bgButton: "bg-[#897CC0]",
  },
  {
    title: "AI Character Analysis",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/character.png",
    bgIcon: "bg-[#D0F9E3]",
    bgButton: "bg-[#4AC1A2]",
  },
  {
    title: "AI Identity Scoring",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/identitas.png",
    bgIcon: "bg-[#FEF3C7]",
    bgButton: "bg-[#E7AF52]",
  },
  {
    title: "AI Character Scoring",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/character_scoring.png",
    bgIcon: "bg-[#ECEAF5]",
    bgButton: "bg-[#897CC0]",
  },
  {
    title: "AI Capability Scoring",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/capability.png",
    bgIcon: "bg-[#D0F9E3]",
    bgButton: "bg-[#4AC1A2]",
  },
  {
    title: "AI Credit Scoring",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/creditScoring.png",
    bgIcon: "bg-[#D0E6F5]",
    bgButton: "bg-[#6C99C6]",
  },
];

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const DashboardPage = () => {
  const pathname = usePathname();

  return (
    <DashboardLayout hover={pathname}>
      {/* Dashboard Card */}
      <section className="relative hidden md:block w-full">
        <h1 className="pt-2 pl-5 font-bold">RIWAYAT PERMINTAAN</h1>
        {/* Card */}
        <Carousel responsive={responsive} className="ml-5">
          {dashboardCardData.map((dataCard, index) => (
            <div
              key={index}
              className="w-[220px] border p-3 bg-white rounded-md shadow mt-3 carousel-item"
            >
              <div className="flex justify-between w-full">
                <div className={`${dataCard.bgIcon} p-1.5 rounded-md mr-3`}>
                  <Image
                    src={dataCard.image}
                    alt="ai-automation"
                    width={50}
                    height={10}
                    className="scale-75"
                  />
                </div>

                <div className="text-[14px]">
                  <h2 className={`font-semibold title-dashboard-card-first}`}>
                    {dataCard.title}
                  </h2>
                  <p className="tracking-tighter text-[12px]">
                    {dataCard.jumlahData} Total Permintaan
                  </p>
                </div>
              </div>
              <div
                className={`${dataCard.bgButton} hover:opacity-70 transition-all duration-300 mb-1 mt-4 text-center py-1 rounded-md`}
              >
                <Link href="#" className="font-semibold text-white">
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Dashboard Stats ** */}
      <section className="hidden mt-5 md:block mr-5 pb-5">
        <div className="flex justify-between mb-7 pr-5">
          <h1 className="pt-1 pl-5 font-bold">Grafik Penggunaan</h1>
          {/* Dropdown */}
          <div className="w-48">
            <select
              id="fruits"
              name="fruits"
              className="block text-sm w-full mt-1 rounded-md border-gray-300 bg-[#F5F5F5] p-3 border shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="semua">Semua</option>
              <option value="tahun">Tahun</option>
              <option value="bulan">Bulan</option>
              <option value="minggu">Minggu</option>
            </select>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex space-x-5 justify-between px-5 mb-5">
          <DashboardStatsContentLayout title="RIWAYAT PERMINTAAN">
            <AreaChart />
          </DashboardStatsContentLayout>

          <DashboardStatsContentLayout title="RIWAYAT NILAI SKOR">
            <DoughnutChart />
          </DashboardStatsContentLayout>
        </div>
        <div className="flex space-x-5 justify-between px-5 mb-5">
          <DashboardStatsContentLayout title="TRACK USIA">
            <VerticalBarChart />
          </DashboardStatsContentLayout>

          <DashboardStatsContentLayout title="TRACK LOKASI">
            <VerticalBarChart />
          </DashboardStatsContentLayout>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DashboardPage;
