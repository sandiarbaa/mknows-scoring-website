
// import axios from "axios";
// // import { useRouter } from "next/navigation";

// // Fungsi untuk menghapus token dan logout
// const Logout = async () => {
//   // const router = useRouter();

//   try {
//     const refreshToken = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("refreshToken="))
//       ?.split("=")[1];

//     if (!refreshToken) {
//       throw new Error("Refresh token not found");
//     }

//     // Lakukan request DELETE ke backend untuk menghapus token
//     await axios.delete("http://13.210.185.89/authentication", {
//       data: {
//         refreshToken,
//       },
//     });

//     // Hapus token dari localStorage dan cookie
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     // document.cookie =
//     //   "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

//     // Redirect ke halaman login
//     window.location.href = "/login";
//     // router.push("/login");
//   } catch (error) {
//     return null;
//   }
// };

// export default Logout;


import axios from "axios";

// Fungsi untuk menghapus token dan logout
const Logout = async () => {
  try {
    // Ambil refresh token dari localStorage
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }

    // Lakukan request DELETE ke backend untuk menghapus token
    await axios.delete("http://13.210.185.89/authentication", {
      data: {
        refreshToken,
      },
    });

    // Hapus token dari localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Redirect ke halaman login
    window.location.href = "/login";
  } catch (error) {
    console.error("Error during logout:", error);
    return null;
  }
};

export default Logout;
