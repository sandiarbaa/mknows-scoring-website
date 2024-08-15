import LoginLayout from "@/app/components/Layouts/LoginLayout";
import DropDownRegister from "./DropDownRegister";
import Button from "@/app/components/Elements/Button";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { FormEvent, useState } from "react";

const RegisterPage = () => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [role, setRole] = useState<string>("");
//   const [msg, setMsg] = useState<string>("");

//   const router = useRouter();

//   const auth = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://13.210.185.89/authentication", {
//         email,
//         password,
//         role,
//       });
//       if (response.status === 201) {
//         const { accessToken, refreshToken } = response.data.data;

//         localStorage.setItem("accessToken", accessToken);
//         document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=strict; max-age=${
//           30 * 24 * 60 * 60
//         }`; // 30 hari
//         router.push("/dashboard");
//       }
//     } catch (error: any) {
//       setMsg(error.response.data.message);
//     }
//   };

  return (
    <div>
      <LoginLayout title="Register">
        <form>
          {/* Email */}
          <div className="flex flex-col mb-3">
            <input
              type="email"
              placeholder="Email"
            //   value={email}
            //   onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-md border-2 focus:border-ijoToska focus:outline-none placeholder:text-tulisan"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col mb-2">
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-2 rounded-md border-2 focus:border-ijoToska focus:outline-none placeholder:text-tulisan"
            //   value={password}
            //   onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <DropDownRegister />
          <div className="pt-4">
            <Button classStyle="w-full bg-ijoToska text-white font-medium py-2 rounded-md mb-2 active:bg-[#E5E5E5] active:text-[#A3A3A3]">
              Register
            </Button>
          </div>
        </form>
      </LoginLayout>
    </div>
  );
};

export default RegisterPage;
