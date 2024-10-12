import api from "@/app/(pages)/(auth)/login/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // Impor useState
import ModalDeleteRegister from "./ModalDeleteRegister";
import Pagination from "../Pagination";
import DatePicker from "../../Elements/DatePicker";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface User {
  id: number;
  username: string;
  role: string;
  nik: string;
  name: string;
  email: string;
  tanggal_input: string;
  ktpPhoto: string;
  created_at: string;
}

type tableRegisterProps = {
  search: string;
};

const TableRegister = ({ search }: tableRegisterProps) => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]); // Deklarasikan state users
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10); // Ukuran halaman, bisa diubah sesuai kebutuhan
  const [totalPage, setTotalPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const handleDeleteUser = (deletedUserId: number) => {
    setUsers(users.filter((user) => user.id !== deletedUserId));
    setModalDelete(false); // Tutup modal setelah menghapus
  };

  const handleEditAccount = (userId: number) => {
    router.push(`/register/editUser/${userId}`);
  };

  const handleModalDelete = (userId: number) => {
    setModalDelete(true);
    setUserId(userId);
  };
  const handleCloseModalDelete = () => {
    setModalDelete(false);
  };

  // Fetch users
  const fetchUsers = async (page: number) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await api.get(`/users/list?size=${size}&current=${page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const usersData = Array.isArray(res.data.data.users)
        ? res.data.data.users
        : [];
      setUsers(usersData); // Simpan data pengguna ke state
      setSize(res.data.page.size);
      setTotalPage(res.data.page.totalPages); // Set total halaman
      setTotal(res.data.page.total); // Atur halaman saat ini dari respons
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page, size]);

  // Pencarian
  useEffect(() => {
    if (search !== "") {
      setPage(1);
      const results = users.filter((user) => {
        const nik = user.nik ? user.nik.toLowerCase() : ""; // Cek apakah nik tidak null
        const username = user.username ? user.username.toLowerCase() : ""; // Cek apakah username tidak null
        return (
          nik.includes(search.toLowerCase()) ||
          username.includes(search.toLowerCase())
        );
      });
      setSearchResults(results);
    } else {
      setSearchResults(users);
    }
  }, [search, users]);

  const prevButton = (): void => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextButton = (): void => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs bg-white table-auto text-start">
          <thead className="bg-[#F5F8FF] text-tulisan">
            <tr>
              <th className="py-2 border-b-[1.8px]">No</th>
              <th className="min-w-[80px] border-b-[1.8px]">NIK</th>
              <th className="min-w-[120px] border-b-[1.8px]">Nama</th>
              <th className="min-w-[150px] border-b-[1.8px]">Email</th>
              <th className="min-w-[120px] border-b-[1.8px]">Tanggal Input</th>
              <th className="min-w-[100px] border-b-[1.8px]">Foto</th>
              <th className="min-w-[80px] border-b-[1.8px]">Action</th>
            </tr>
          </thead>

          <tbody>
            {(searchResults.length > 0 ? searchResults : users).map(
              (user, index) => (
                <tr key={user.id} className="text-center">
                  <td className="py-2 border-b">
                    {(page - 1) * size + index + 1}
                  </td>{" "}
                  {/* No */}
                  <td className="border-b">{user.nik || "N/A"}</td> {/* NIK */}
                  <td className="border-b">{user.username}</td> {/* Nama */}
                  <td className="border-b">{user.email}</td> {/* Email */}
                  <td className="border-b">
                    {new Date(user.created_at).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    {/* Menampilkan created_at dalam format yang lebih mudah dibaca */}
                  </td>
                  {/* Tanggal Input */}
                  <td className="border-b text-blue-400 font-medium">
                    {user.ktpPhoto ? (
                      <a
                        href={user.ktpPhoto}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Lihat Foto
                      </a>
                    ) : (
                      "Tidak ada foto"
                    )}
                  </td>
                  <td className="border-b">
                    <button onClick={() => handleEditAccount(user.id)}>
                      <Image
                        src={"/assets/dashboard/register/edit-account.png"}
                        alt="edit"
                        width={26}
                        height={26}
                        className="inline-block mr-2"
                      />
                    </button>
                    <button onClick={() => handleModalDelete(user.id)}>
                      <Image
                        src={"/assets/dashboard/register/delete-account.png"}
                        alt="delete"
                        width={26}
                        height={26}
                        className="inline-block mr-2"
                      />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        {searchResults.length > 0 && (
          <Pagination
            page={page}
            setPage={setPage}
            totalData={total}
            noAwal={(page - 1) * size + 1}
            noAkhir={Math.min(page * size, total)}
            prevButton={prevButton}
            nextButton={nextButton}
            numberPage={Array.from({ length: totalPage }, (_, i) => i + 1)}
          />
        )}

        <div className="z-10">
          {modalDelete && userId ? (
            <ModalDeleteRegister
              userId={userId}
              close={handleCloseModalDelete}
              onDelete={handleDeleteUser}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TableRegister;
