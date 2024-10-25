import axios from "axios";

// Buat instance Axios
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL_BE}`,
  // baseURL: `http://localhost:80`,
});

// Fungsi untuk merefresh access token
export const refreshAccessToken = async () => {
  try {
    // Ambil refresh token dari localStorage
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }

    // Lakukan request untuk merefresh access token
    const refresh = await api.put("/authentication", {
      refreshToken,
    });

    const { accessToken } = refresh.data.data;

    // Simpan access token yang baru di localStorage
    localStorage.setItem("accessToken", accessToken);

    return accessToken;
  } catch (error) {
    console.error("Gagal merefresh access token:", error);
    return null;
  }
};

// Tambahkan interceptor ke instance Axios
api.interceptors.response.use(
  (response) => response, // Jika response berhasil, lanjutkan
  async (error) => {
    const originalRequest = error.config;

    // Jika token sudah kedaluwarsa dan belum dicoba refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Coba untuk refresh access token
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        // Update Authorization header dengan token yang baru
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Ulangi request yang gagal
      }
    }

    return Promise.reject(error); // Jika gagal, lempar error
  }
);

export default api;
