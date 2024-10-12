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
    // await axios.delete("http://localhost:80/authentication", {
    //   data: {
    //     refreshToken,
    //   },
    // });

    // Hapus token dari localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // localStorage.removeItem("username");
    localStorage.removeItem("role");

    // Redirect ke halaman login
    window.location.href = "/login";
  } catch (error) {
    console.error("Error during logout:", error);
    return null;
  }
};

export default Logout;
