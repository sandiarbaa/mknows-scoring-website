import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:3001",
// });

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:3001",
  baseURL: "http://13.210.185.89/",
  headers: {
    "Content-Type": "application/json",
  },
});
