"use client";

import LoginLayout from "@/app/components/Layouts/LoginLayout";
import DropDownRegister from "./DropDownRegister";
import Button from "@/app/components/Elements/Button";
import { useState } from "react";
import api from "../login/api";
import ProtectedRoute from "../login/protectedRoute/ProtectedRoute";
import ModalAuth from "../login/modalAuth/ModalAuth";

const RegisterPage = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [msg, setMsg] = useState<string>("");

  const handleCloseModal = () => {
    setIsModalVisible(false); // Fungsi untuk menutup modal
  };

    const Auth = async (e: any) => {
    const accessToken = localStorage.getItem("accessToken");

        e.preventDefault();
        try {
            const response = await api.post('/users',{
                email: email,
                password: password,
                role: role,
            }, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            // console.log(response);
            setMsg(response.data.message);
            setIsModalVisible(true);
        } catch (error: any) {
            setMsg(error.response.data.message);
            setIsModalVisible(true);
        }
    }

  return (
    <ProtectedRoute>
      <ModalAuth msg={msg} isVisible={isModalVisible} onClose={handleCloseModal} />
      <LoginLayout title="Register">
        <form onSubmit={Auth}>
          {/* Email */}
          <div className="flex flex-col mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-md border-2 focus:border-ijoToska focus:outline-none placeholder:text-tulisan"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col mb-2">
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-2 rounded-md border-2 focus:border-ijoToska focus:outline-none placeholder:text-tulisan"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <DropDownRegister setRole={setRole} />
          <div className="pt-4">
            <Button classStyle="w-full bg-ijoToska text-white font-medium py-2 rounded-md mb-2 active:bg-[#E5E5E5] active:text-[#A3A3A3]">
              Register
            </Button>
          </div>
        </form>
      </LoginLayout>
    </ProtectedRoute>
  );
};

export default RegisterPage;
