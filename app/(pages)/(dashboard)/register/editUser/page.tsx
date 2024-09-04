"use client";

import ProtectedRoute from "@/app/(pages)/(auth)/login/protectedRoute/ProtectedRoute";
import InputRegister from "@/app/components/Fragments/register/InputRegister";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import { usePathname } from "next/navigation";

const EditUser = () => {
  const pathname = usePathname();
  return (
    <>
      <ProtectedRoute>
        <DashboardLayout hover={pathname}>
          <div>
            <InputRegister title="PasFoto" />
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    </>
  );
};

export default EditUser;
