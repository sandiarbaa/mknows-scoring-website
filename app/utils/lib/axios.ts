import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:3001",
// });

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});
