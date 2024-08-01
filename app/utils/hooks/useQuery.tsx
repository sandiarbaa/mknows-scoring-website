import { axiosInstance } from "../lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Fetchin Person
const fetchPersons = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, page, size] = queryKey;
  const { data } = await axiosInstance.get(
    `/persons?size=${size}&current=${page}`
  );
  // console.log(data);
  return data;
};

export const useQueryPersons = (page: number, size: number) => {
  return useQuery({
    queryKey: ["persons", page.toString(), size.toString()],
    queryFn: fetchPersons,
    refetchOnWindowFocus: false,
  });
};

// Fetching Report
const fetchReports = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, page, size] = queryKey;
  const { data } = await axiosInstance.get(
    `/reports?size=${size}&current=${page}`
  );
  // console.log(data);
  return data;
};

export const useQueryReports = (page: number, size: number) => {
  return useQuery({
    queryKey: ["reports", page.toString(), size.toString()],
    queryFn: fetchReports,
    refetchOnWindowFocus: false,
  });
};

// Fetching Requests
const fetchRequests = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, page, size] = queryKey;
  const { data } = await axiosInstance.get(
    `/requests?size=${size}&current=${page}`
  );
  // console.log(data);
  return data;
};

export const useQueryRequests = (page: number, size: number) => {
  return useQuery({
    queryKey: ["requests", page.toString(), size.toString()],
    queryFn: fetchRequests,
    refetchOnWindowFocus: false,
  });
};

// Post Person
// const postPerson = async (formData: FormData) => {
//   const { data } = await axiosInstance.post("/persons", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return data;
// };

// export const usePostPerson = () => {
//   const queryClient = useQueryClient();

//   return useMutation(postPerson, {
//     onSuccess: () => {
//       // Invalidasi dan refetch data persons setelah berhasil menambahkan data baru
//       queryClient.invalidateQueries(["persons"]);
//     },
//   });
// };

// const postPerson = async (formData: FormData) => {
//   const { data } = await axiosInstance.post("/persons", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return data;
// };

// export const usePostPerson = () => {
//   const queryClient = useQueryClient();

//   return useMutation(postPerson, {
//     onSuccess: () => {
//       // Invalidasi dan refetch data persons setelah berhasil menambahkan data baru
//       queryClient.invalidateQueries(["persons"]);
//     },
//   });
// };
