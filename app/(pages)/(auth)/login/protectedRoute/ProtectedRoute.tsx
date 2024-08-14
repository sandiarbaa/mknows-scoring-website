import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      router.push("/login");
    }
  }, [router]);

  // const axios = require("axios");

  // // Bearer token untuk otentikasi
  // const token = localStorage.getItem("accessToken");

  // // Body request dalam format JSON
  // const requestBody = {
  //   userId: 12345,
  //   title: 'New Post Title',
  //   body: 'This is the content of the post.'
  // };

  // // Melakukan POST request
  // axios.post('https://api.example.com/posts', requestBody, {
  //   headers: {
  //     'Authorization': Bearer ${token},
  //     'Content-Type': 'application/json' // Menentukan bahwa body request adalah JSON
  //   }
  // })
  // try(response => {
  //   console.log('Response data:', response.data); // Menampilkan data respons dari server
  // })
  // .catch(error => {
  //   console.error('Error:', error.response ? error.response.data : error.message); // Menampilkan error jika ada
  // });

  return <>{children}</>;
};

export default ProtectedRoute;
